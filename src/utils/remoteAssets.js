/**
 * Utilitário para resolver assets que agora estão hospedados externamente
 * para evitar problemas de upload SFTP e build pesado.
 */
export function remoteAsset(path) {
    // Remove barra inicial se houver
    const cleanPath = path.startsWith("/") ? path.slice(1) : path;

    // URL base onde os assets foram colocados manualmente no servidor
    const baseUrl = "https://flaviobrick.com.br/assets_externos/assets/";

    return `${baseUrl}${cleanPath}`;
}
