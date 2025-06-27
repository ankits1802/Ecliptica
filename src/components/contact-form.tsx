
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Send, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { userData } from '@/data/user-data';

const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(1, { message: 'Message is required.' }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

export function ContactForm({ onSnap }: { onSnap?: (onComplete: () => void) => void }) {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: '',
      email: '',
      message: '',
    },
  });

  const messageValue = form.watch("message");

  async function onSubmit(data: ContactFormValues) {
    setIsSubmitting(true);

    const subject = encodeURIComponent(`Portfolio Contact: ${data.name}`);
    const body = encodeURIComponent(
      `Name: ${data.name}\nEmail: ${data.email}\n\nMessage:\n${data.message}`
    );
    const mailtoLink = `mailto:${userData.email}?subject=${subject}&body=${body}`;

    try {
      window.location.href = mailtoLink;

      toast({
        title: 'Opening Email Client',
        description: "Your email client should open shortly. Please complete sending your message there.",
      });

      if (onSnap) {
        // Trigger the snap animation and pass a callback to run on completion
        onSnap(() => {
          form.reset();
          setIsSubmitting(false);
        });
      } else {
        // If no snap effect, reset immediately
        form.reset();
        setIsSubmitting(false);
      }
    } catch (error) {
      console.error('Error constructing mailto link:', error);
      toast({
        title: 'Error Preparing Email',
        description: 'Could not open your email client. Please copy the email address and send your message manually.',
        variant: 'destructive',
      });
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Full Name</FormLabel>
              <FormControl>
                <Input placeholder="Your Name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email Address</FormLabel>
              <FormControl>
                <Input type="email" placeholder="your.email@example.com" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Message</FormLabel>
              <FormControl>
                <Textarea placeholder="Your message..." rows={8} {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="flex items-center gap-4">
          <Button type="submit" className="w-full md:w-auto bg-primary hover:bg-primary/90 text-primary-foreground" disabled={!messageValue || isSubmitting}>
            {isSubmitting ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Send className="mr-2 h-4 w-4" />
            )}
            Send Message
          </Button>
           <Button type="submit" variant="outline" size="icon" aria-label="Submit and Animate" disabled={!messageValue || isSubmitting}>
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </form>
    </Form>
  );
}
