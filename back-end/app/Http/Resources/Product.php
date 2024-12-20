<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class Product extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return[
            'id' => $this->id,
            'name' => $this->name,
            'sizes' => $this->sizes,
            'colors' => $this->colors,
            'quantity' => $this->quantity,
            'description' => $this->description,
            'price' => $this->price,
            'discount_price' => $this->discount_price,
            'cate_id' => $this->cate_id,
            'image_id' => $this->image_id,
            'created_at' => $this->created_at->format('d/m/Y'),
            'updated_at' => $this->updated_at->format('d/m/Y'),
        ];
    }
}
