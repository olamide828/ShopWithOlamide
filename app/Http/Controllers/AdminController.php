<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */


    public function stats()
    {
        $stats = [
            'products' => Product::count(),
            'users' => User::where('is_admin', 0)->count(),
            'sales' => 0, // or calculate total sales
        ];

        $activities = []; // fetch recent activities
        $users = User::all();

        return inertia('DashboardHome', compact('stats', 'activities', 'users'));
    }
    public function manageUsers()
    {
        return Inertia::render('ManageUsers', [
            // Only send non-admin users to prevent accidental self-deletion
            'users' => User::where('is_admin', false)->get(),
            'user' => auth()->user(),
        ]);
    }

    // 2. Logic to Toggle Ban
    public function toggleBan(User $user)
    {
        $user->update([
            'is_banned' => !$user->is_banned
        ]);

        return back()->with('message', 'User status updated.');
    }

    // 3. Logic to Delete
    public function destroy($id)
    {
        $user = User::findOrFail($id);

        if (auth()->id() === $user->id) {
            return back()->with('error', 'You cannot delete yourself.');
        }


        $user->delete();

        return back()->with('message', 'User deleted successfully.');
    }
}

