"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { createTestimonial } from '@/lib/actions';
import { User, Quote, Star, ImageIcon, Send } from 'lucide-react';

export default function NewTestimonialPage() {
    const [loading, setLoading] = useState(false);
    const [preview, setPreview] = useState<string | null>(null);

    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setPreview(URL.createObjectURL(file));
        }
    };

    return (
        <div className="max-w-3xl mx-auto">
            <h2 className="text-3xl font-black tracking-tight text-white mb-8">Add New Testimonial</h2>

            <form action={async (formData) => {
                setLoading(true);
                try {
                    await createTestimonial(formData);
                } finally {
                    setLoading(false);
                }
            }} className="space-y-8 glass p-10 rounded-[2.5rem]">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Customer Name</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="name"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                                    placeholder="John Doe"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Customer Role</label>
                            <div className="relative group">
                                <Quote className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="role"
                                    required
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                                    placeholder="Travel Enthusiast"
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Rating (1-5)</label>
                            <div className="relative group">
                                <Star className="absolute left-4 top-4 w-5 h-5 text-slate-500 group-focus-within:text-primary transition-colors" />
                                <input
                                    name="rating"
                                    type="number"
                                    min="1"
                                    max="5"
                                    defaultValue="5"
                                    className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Profile Photo</label>
                        <div className="relative group aspect-square rounded-[2rem] overflow-hidden bg-slate-950/50 border border-white/5 flex flex-col items-center justify-center cursor-pointer hover:border-primary/50 transition-all">
                            {preview ? (
                                <img src={preview} className="w-full h-full object-cover" alt="Preview" />
                            ) : (
                                <>
                                    <ImageIcon className="w-10 h-10 text-slate-600 mb-2" />
                                    <span className="text-xs text-slate-500 font-bold uppercase tracking-widest">Upload Image</span>
                                </>
                            )}
                            <input
                                type="file"
                                name="image-file"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleImageChange}
                                accept="image/*"
                            />
                        </div>
                    </div>
                </div>

                <div className="space-y-2">
                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Review Content</label>
                    <textarea
                        name="content"
                        required
                        rows={4}
                        className="w-full bg-slate-950/50 border border-white/5 rounded-3xl p-6 text-white focus:outline-none focus:border-primary transition-all"
                        placeholder="Share the customer's experience here..."
                    />
                </div>

                <div className="flex justify-end pt-4">
                    <Button type="submit" size="lg" disabled={loading} className="gap-2 px-10">
                        <Send className="w-5 h-5" />
                        {loading ? "Adding..." : "Publish Testimonial"}
                    </Button>
                </div>
            </form>
        </div>
    );
}
