# === CONFIG ===
$ProjectPath   = "C:\Users\USUARIO\Desktop\m2-replica"
$Port          = 8080                  # porta do preview
$DeployToShare = $false                # mude para $true se quiser copiar para o NAS a cada build
$SharePath     = "\\192.168.100.30\lab\site_m2"

# === PREP ===
$ErrorActionPreference = "Stop"
Set-Location $ProjectPath

# Libera firewall (idempotente)
try {
  New-NetFirewallRule -DisplayName "Servidor M2 Preview $Port" -Direction Inbound -Protocol TCP -LocalPort $Port -Action Allow -ErrorAction Stop | Out-Null
} catch {}

# Build inicial
Write-Host "Build inicial..."
npm run build

# Sobe o servidor 'serve' na pasta dist (em outra janela)
$DistPath = Join-Path $ProjectPath "dist"
if (-not (Test-Path $DistPath)) { throw "dist nao encontrado" }

Write-Host ("Subindo servidor estatico em http://localhost:{0}" -f $Port)
Start-Process powershell -ArgumentList "-NoExit","-Command","cd `"$DistPath`"; serve -p $Port"

# Descobre IP (primeiro IPv4 util)
$ip = (Get-NetIPAddress -AddressFamily IPv4 |
  Where-Object { $_.IPAddress -notlike '169.*' -and $_.IPAddress -ne '127.0.0.1' -and $_.PrefixOrigin -ne 'WellKnown' } |
  Select-Object -First 1 -ExpandProperty IPAddress)

Write-Host ("Link para enviar: http://{0}:{1}" -f $ip, $Port)

# Sincroniza para o NAS (opcional)
function Sync-ToShare {
  if ($DeployToShare -and (Test-Path $SharePath)) {
    Write-Host ("Atualizando {0} ..." -f $SharePath)
    robocopy $DistPath $SharePath /MIR /NFL /NDL /NP /NJH /NJS | Out-Null
  }
}

Sync-ToShare

# === WATCHER: reconstrói quando algo em src/ muda (com debounce) ===
$SrcPath = Join-Path $ProjectPath "src"
$watcher = New-Object System.IO.FileSystemWatcher
$watcher.Path = $SrcPath
$watcher.IncludeSubdirectories = $true
$watcher.Filter = "*.*"
$watcher.EnableRaisingEvents = $true

# Debounce timer
$timer = New-Object System.Timers.Timer
$timer.Interval = 800
$timer.AutoReset = $false

$building = $false
$changeAction = {
  if ($building) { return }
  $building = $true
  try {
    Write-Host ""
    Write-Host "Mudancas detectadas -> build..."
    npm run build | Out-Null
    Sync-ToShare
    Write-Host "Build concluido. Peca para recarregar a pagina (F5)."
  } catch {
    Write-Host ("Erro no build: {0}" -f $_.Exception.Message)
  } finally {
    $building = $false
  }
}

$null = Register-ObjectEvent -InputObject $timer -EventName Elapsed -Action $changeAction

$onChange = {
  # Ignora mudancas na dist/
  if ($Event.SourceEventArgs.FullPath -like "*\dist\*") { return }
  $timer.Stop(); $timer.Start()
}

$null = Register-ObjectEvent -InputObject $watcher -EventName Changed -Action $onChange
$null = Register-ObjectEvent -InputObject $watcher -EventName Created -Action $onChange
$null = Register-ObjectEvent -InputObject $watcher -EventName Deleted -Action $onChange
$null = Register-ObjectEvent -InputObject $watcher -EventName Renamed -Action $onChange

Write-Host ""
Write-Host ("Observando {0}. Deixe esta janela aberta." -f $SrcPath)
Write-Host ("Envie para a Rafa: http://{0}:{1}" -f $ip, $Port)
Write-Host "Para sair: Ctrl+C"

# Mantem o script vivo
while ($true) { Start-Sleep -Seconds 1 }
