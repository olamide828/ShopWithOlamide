<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Setting;
use Illuminate\Http\Request;
use Inertia\Inertia;

class SettingsController extends Controller
{
    public function index()
    {
        return Inertia::render('Admin/AdminSettings', [
            'deliveryFee' => (int) Setting::getValue('delivery_fee', 3000),
            'freeDeliveryThreshold' => (int) Setting::getValue('free_delivery_threshold', 50000),
        ]);
    }

    public function update(Request $request)
    {
        $request->validate([
            'delivery_fee' => 'required|numeric|min:0',
            'free_delivery_threshold' => 'required|numeric|min:0',
        ]);

        Setting::where('key', 'delivery_fee')
            ->update(['value' => $request->delivery_fee]);

        Setting::where('key', 'free_delivery_threshold')
            ->update(['value' => $request->free_delivery_threshold]);

        return back()->with('success', 'Delivery settings updated successfully');
    }
}