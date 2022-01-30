<?php

$EMAIL_ID = 385362101; // 9-digit integer value (i.e., 123456789)
$API_KEY = "1bf2aec7"; // API key (string) provided by Open Movie DataBase (i.e., "ab123456")

session_start(); // Connect to the existing session

require_once '/home/common/php/dbInterface.php'; // Add database functionality
require_once '/home/common/php/mail.php'; // Add email functionality
require_once '/home/common/php/p4Functions.php'; // Add Project 4 base functions

processPageRequest(); // Call the processPageRequest() function

// DO NOT REMOVE OR MODIFY THE CODE OR PLACE YOUR CODE ABOVE THIS LINE

function addMovieToCart($imdbID)
{

    if(!movieExistsInDB($imdbID)){
        $result= file_get_contents('http://www.omdbapi.com/?apikey='.$GLOBALS['API_KEY'].'&i='.$imdbID.'&type=movie&r=json');
        $movieInfo = json_decode($result, true);
/**
        $imdbId = $movieInfo["imdbID"]; $title = $movieInfo["Title"];       $year = $movieInfo["Year"];
        $rating = $movieInfo["imdbRatings"];$runtime = $movieInfo["Runtime"];   $genre = $movieInfo["Genre"];
        $actors = $movieInfo["Actors"]; $director = $movieInfo["Director"]; $writer = $movieInfo["Writer"];
        $plot = $movieInfo["Plot"];     $poster = $movieInfo["Poster"];
        addMovie($imdbId, $title, $year, $rating, $runtime, $genre, $actors, $director, $writer, $plot, $poster);
 **/
print_r(array_values($movieInfo));
    addMovie($movieInfo["imdbID"], $movieInfo["Title"], $movieInfo["Year"], $movieInfo["imdbRatings"], $movieInfo["Runtime"],
        $movieInfo["Genre"], $movieInfo["Actors"], $movieInfo["Director"], $movieInfo["Writer"], $movieInfo["Plot"], $movieInfo["Poster"]);
    }
    addMovieToShoppingCart($_SESSION["userId"], movieExistsInDB($imdbID));
    displayCart();
}

function displayCart()
{
    $movies = getMoviesInCart($_SESSION["userId"]);
    if(isset($movies))
    $count = count($movies) ;
    else $count = 0;
    require_once ("./templates/cart_form.html");
}

function processPageRequest()
{
    if(isset($_SESSION["displayName"])){
        if(isset($_GET["action"]) && !empty($_GET["action"])){
            if($_GET["action"] == "add")
                addMovieToCart($_GET["imdb_id"]);
            else if ($_GET["action"] == "remove")
                removeMovieFromCart($_GET["movie_id"]);
            header("Location: ./index.php");
            exit();
        } else displayCart();
    } else{
        header("Location: ./logon.php");
        exit();
    }
}

function removeMovieFromCart($movieID)
{
    removeMovieFromShoppingCart($_SESSION["userId"], $movieID);
    displayCart();
    header("Location: ./index.php");
    exit();
}

?>