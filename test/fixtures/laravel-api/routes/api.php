<?php

use App\Http\Controllers\TokenAuthenticationController;
use App\Http\Resources\UserResource;
use Illuminate\Foundation\Http\Middleware\HandlePrecognitiveRequests;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return UserResource::make($request->user());
})->middleware('auth:sanctum');

Route::post('/tokens/create', [TokenAuthenticationController::class, 'store'])
->middleware(['guest']);

Route::post('/tokens/delete', [TokenAuthenticationController::class, 'destroy'])
->middleware(['auth:sanctum']);

Route::patch('/profile', function (Request $request) {
    $request->validate([
        'name' => ['required', 'string', 'max:255'],
        'email' => ['required', 'email'],
        'avatar' => [
            // ['required'],
            'nullable',
            'image',
            'mimes:jpg,png',
        ],
    ]);

    $path = null;
    if ($request->hasFile('avatar')) {
        $path = $request->file('avatar')->store('avatars', 'public');
    }

    $request->user()->update([...$request->only('name', 'email'), 'avatar' => $path]);

    return UserResource::make($request->user()->refresh());
})->middleware(['auth:sanctum', HandlePrecognitiveRequests::class]);
