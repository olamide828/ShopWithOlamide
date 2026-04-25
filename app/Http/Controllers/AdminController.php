<?php

namespace App\Http\Controllers;

use App\Models\Product;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AdminController extends Controller
{
    public function index()
    {
        //
    }

    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        //
    }

    public function show(string $id)
    {
        //
    }

    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {
        //
    }

    public function stats()
    {
        $stats = [
            'products' => Product::count(),
            'users'    => User::where('is_admin', 0)->count(),
            'sales'    => 0,
        ];

        $activities = [];
        $users      = User::all();

        return inertia('DashboardHome', compact('stats', 'activities', 'users'));
    }

    public function manageUsers()
    {
        return Inertia::render('ManageUsers', [
            'users' => User::where('is_admin', false)
                ->select([
                    'id',
                    'name',
                    'email',
                    'role',
                    'is_banned',
                    'last_ip',
                    'last_device',
                    'last_browser',
                    'last_os',
                    'last_seen_at',
                ])
                ->latest('last_seen_at')
                ->get(),
            'user' => auth()->user(),
        ]);
    }

    public function toggleBan(User $user)
    {
        $user->update([
            'is_banned' => !$user->is_banned,
        ]);

        return back()->with('message', 'User status updated.');
    }

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