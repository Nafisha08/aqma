<?php
/**
 * Simple login processing script (for demonstration purposes only).
 * In a real Drupal site, this would be handled by Drupal's user authentication system.
 */

// This is just a demo script to show form submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = isset($_POST['name']) ? $_POST['name'] : '';
    $password = isset($_POST['pass']) ? $_POST['pass'] : '';
    
    // Demo validation - in a real application, you would validate against a database
    if ($username === 'admin' && $password === 'Password123') {
        // Success - in a real app, you would set session variables, etc.
        echo json_encode([
            'success' => true,
            'message' => 'Login successful!'
        ]);
    } else {
        // Failed login
        echo json_encode([
            'success' => false,
            'message' => 'Invalid username or password.'
        ]);
    }
    exit;
}

// If not a POST request, redirect to the login page
header('Location: index.html');
exit;