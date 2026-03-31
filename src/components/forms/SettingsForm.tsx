"use client";

import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/Button';
import { saveSiteSettings } from '@/lib/actions';
import { Save, Phone, Mail, MapPin, Type, MessageCircle, Upload, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

export const SettingsForm = ({ initialSettings }: { initialSettings: Record<string, string> }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [previewUrl, setPreviewUrl] = useState(initialSettings.logoUrl || "/logo-v4.png");
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const url = URL.createObjectURL(file);
            setPreviewUrl(url);
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setMessage("");

        try {
            const formData = new FormData(e.currentTarget);
            // Ensure logoUrl is passed if no new file is selected
            if (!formData.get("logo-file") || (formData.get("logo-file") as File).size === 0) {
                formData.set("logo-url", initialSettings.logoUrl || "/logo-v4.png");
            }

            const result = await saveSiteSettings(formData);
            
            if (result.success) {
                setMessage("Settings saved successfully!");
                if (result.logoUrl) {
                    setPreviewUrl(result.logoUrl);
                }
                setTimeout(() => setMessage(""), 3000);
            } else {
                setMessage(result.error || "Error saving settings.");
            }
        } catch (error) {
            console.error(error);
            setMessage("Error saving settings.");
        } finally {
            setLoading(false);
        }
    };

    const sections = [
        {
            title: "Contact Information",
            icon: Phone,
            fields: [
                { key: "phone", label: "Phone Number", type: "text", icon: Phone },
                { key: "whatsapp", label: "WhatsApp Number (Direct Link)", type: "text", icon: MessageCircle },
                { key: "email", label: "Email Address", type: "email", icon: Mail },
                { key: "address", label: "Office Address", type: "textarea", icon: MapPin },
            ]
        },
        {
            title: "Hero Section",
            icon: Type,
            fields: [
                { key: "heroTitle", label: "Hero Title", type: "text", icon: Type },
                { key: "heroSubtitle", label: "Hero Subtitle", type: "textarea", icon: Type },
            ]
        },
        {
            title: "Footer Content",
            icon: Type,
            fields: [
                { key: "footerTagline", label: "Footer Tagline / Description", type: "textarea", icon: Type },
                { key: "footerDestinations", label: "Destinations (comma separated)", type: "textarea", icon: MapPin },
                { key: "footerCopyright", label: "Copyright Text", type: "text", icon: Type },
            ]
        },
        {
            title: "Social Media Links",
            icon: MessageCircle,
            fields: [
                { key: "socialInstagram", label: "Instagram URL", type: "text", icon: MessageCircle },
                { key: "socialFacebook", label: "Facebook URL", type: "text", icon: MessageCircle },
                { key: "socialTwitter", label: "Twitter / X URL", type: "text", icon: MessageCircle },
            ]
        },
        {
            title: "Map Integration",
            icon: MapPin,
            fields: [
                { key: "googleMapsEmbed", label: "Google Maps Embed URL", type: "textarea", icon: MapPin },
            ]
        }
    ];

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {message && (
                <div className={`p-4 rounded-xl font-bold text-center fixed top-24 right-8 z-50 shadow-2xl min-w-[300px] animate-in slide-in-from-right-8 duration-300 ${message.includes('Error') ? 'bg-red-500 text-white' : 'bg-primary text-white'}`}>
                    {message}
                </div>
            )}

            {/* Branding Section */}
            <div className="glass p-8 rounded-[2rem] space-y-6 mb-8">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                            <ImageIcon className="w-5 h-5" />
                        </div>
                        <h3 className="text-xl font-bold">Branding & Logo</h3>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
                    <div className="space-y-4">
                        <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Current Logo Preview</label>
                        <div className="relative aspect-video rounded-2xl overflow-hidden bg-slate-950 border border-white/5 flex items-center justify-center p-4 group">
                            <img 
                                src={previewUrl} 
                                alt="Logo Preview" 
                                className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-110 rounded-2xl" 
                            />
                            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                                <p className="text-white text-[10px] font-black uppercase tracking-tighter">Live Preview</p>
                            </div>
                        </div>
                    </div>

                    <div className="md:col-span-2 space-y-4">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">Upload New Logo</label>
                            <div 
                                onClick={() => fileInputRef.current?.click()}
                                className="cursor-pointer border-2 border-dashed border-white/10 hover:border-primary/50 rounded-2xl p-8 transition-all group flex flex-col items-center justify-center gap-3 bg-slate-950/30"
                            >
                                <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                                    <Upload className="w-6 h-6" />
                                </div>
                                <div className="text-center">
                                    <p className="text-sm font-bold text-white">Click to upload brand logo</p>
                                    <p className="text-xs text-slate-500">Supports PNG, JPG, WEBP (Max 5MB)</p>
                                </div>
                                <input 
                                    ref={fileInputRef}
                                    type="file" 
                                    name="logo-file"
                                    accept="image/*"
                                    className="hidden" 
                                    onChange={handleFileChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {sections.map((section) => (
                    <div key={section.title} className="glass p-8 rounded-[2rem] space-y-6">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center text-primary">
                                <section.icon className="w-5 h-5" />
                            </div>
                            <h3 className="text-xl font-bold">{section.title}</h3>
                        </div>

                        <div className="space-y-4">
                            {section.fields.map((field) => (
                                <div key={field.key} className="space-y-2">
                                    <label className="text-xs font-bold uppercase tracking-wider text-slate-500 ml-1">{field.label}</label>
                                    <div className="relative group">
                                        <div className="absolute left-4 top-4 text-slate-500 group-focus-within:text-primary transition-colors">
                                            <field.icon className="w-5 h-5" />
                                        </div>
                                        {field.type === 'textarea' ? (
                                            <textarea
                                                name={field.key}
                                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all min-h-[100px]"
                                                value={settings[field.key] || ""}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                            />
                                        ) : (
                                            <input
                                                name={field.key}
                                                type={field.type}
                                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all"
                                                value={settings[field.key] || ""}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                            />
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="flex justify-end sticky bottom-8 z-40">
                <Button type="submit" size="lg" disabled={loading} className="gap-2 px-10 shadow-2xl shadow-primary/20">
                    <Save className="w-5 h-5" />
                    {loading ? "Saving..." : "Save All Settings"}
                </Button>
            </div>
        </form>
    );
};
