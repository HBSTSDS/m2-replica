<?php
echo "<pre>";
echo "Current Dir: " . __DIR__ . "\n";
echo "Real Path: " . realpath(".") . "\n";
echo "Listing:\n";
print_r(scandir("."));
echo "</pre>";
?>