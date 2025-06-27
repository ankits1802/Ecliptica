'use client';

import Image from 'next/image';
import type { Testimonial as TestimonialType } from '@/data/user-data';
import { Card, CardContent, CardFooter, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Quote } from 'lucide-react';

export function TestimonialCard({ testimonial, index }: { testimonial: TestimonialType; index: number }) {
    return (
        <Card className="flex flex-col h-full">
            <CardHeader className="pb-4">
                <Quote className="h-8 w-8 text-primary/70 mb-2" />
            </CardHeader>
            <CardContent className="flex-grow">
                <p className="text-muted-foreground italic">&quot;{testimonial.quote}&quot;</p>
            </CardContent>
            <CardFooter className="mt-auto pt-4 border-t">
                <div className="flex items-center gap-3">
                <Avatar className="h-12 w-12">
                    {testimonial.authorImageUrl && (
                    <AvatarImage src={testimonial.authorImageUrl} alt={testimonial.authorName} data-ai-hint={testimonial.dataAiHint || "person"} />
                    )}
                    <AvatarFallback>{testimonial.authorName.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                </Avatar>
                <div>
                    <p className="font-semibold text-foreground">{testimonial.authorName}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.authorTitle}</p>
                </div>
                </div>
            </CardFooter>
        </Card>
    );
}
