<?php
// public/clear.php
$commands = [
    'cache:clear',
    'config:clear',
    'route:clear',
    'view:clear',
    'optimize:clear',
];
foreach ($commands as $command) {
    $output = shell_exec("php ../newyorkerherald/artisan {$command} 2>&1");
    echo "<b>{$command}:</b> " . htmlspecialchars($output) . "<br>";
}
echo "<br><b style='color:green'>Done!</b>";