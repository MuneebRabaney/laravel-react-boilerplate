<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::middleware('auth:api')->get('/user', function (Request $request) {
    return $request->user();
});

// TODO: Add cors middleware
header("Access-Control-Allow-Origin: http://localhost:3001");
header('Access-Control-Allow-Methods: POST OPTIONS');
header("Access-Control-Allow-Headers: Content-Type, Authorization");

Route::middleware('api')->post('/process-data', 'DataConsumerController@process_data');