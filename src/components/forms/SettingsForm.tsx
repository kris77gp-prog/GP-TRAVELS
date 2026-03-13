"use client";

import React, { useState } from 'react';
import { Button } from '@/components/ui/Button';
import { updateSiteSettings } from '@/lib/actions';
import { Save, Phone, Mail, MapPin, Type, MessageCircle } from 'lucide-react';

export const SettingsForm = ({ initialSettings }: { initialSettings: Record<string, string> }) => {
    const [settings, setSettings] = useState(initialSettings);
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");

    const handleChange = (key: string, value: string) => {
        setSettings(prev => ({ ...prev, [key]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await updateSiteSettings(settings);
            setMessage("Settings saved successfully!");
            setTimeout(() => setMessage(""), 3000);
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
                <div className={`p-4 rounded-xl font-bold text-center ${message.includes('Error') ? 'bg-red-500/20 text-red-500' : 'bg-primary/20 text-primary'}`}>
                    {message}
                </div>
            )}

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
                                                className="w-full bg-slate-950/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-primary transition-all min-h-[100px]"
                                                value={settings[field.key] || ""}
                                                onChange={(e) => handleChange(field.key, e.target.value)}
                                            />
                                        ) : (
                                            <input
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

            <div className="flex justify-end">
                <Button type="submit" size="lg" disabled={loading} className="gap-2 px-10">
                    <Save className="w-5 h-5" />
                    {loading ? "Saving..." : "Save All Settings"}
                </Button>
            </div>
        </form>
    );
};
