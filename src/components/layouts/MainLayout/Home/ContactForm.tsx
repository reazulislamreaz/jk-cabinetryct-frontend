"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useSendContactMessageMutation } from "@/store/api/contactApi";
import aboutBg from "@/assets/home/about/jk-bg.png";
import { IError } from "@/types";
import { toast } from "sonner";

const formSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),
  email: z.string().email("Invalid email address"),
  phoneNumber: z.string().min(1, "Phone number is required"),
  customerType: z.string().min(1, "Customer type is required"),
  howHearAboutUs: z.string().min(1, "Please tell us how you heard about us"),
  message: z.string().min(1, "Message is required"),
  nearestLocation: z.string().min(1, "Nearest location is required"),
});

const ContactForm = () => {
  const [sendContactMessage, { isLoading, isSuccess }] =
    useSendContactMessageMutation();

  // Initialize the form with react-hook-form
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      customerType: "",
      howHearAboutUs: "",
      message: "",
      nearestLocation: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      await sendContactMessage(values).unwrap();
      form.reset();
    } catch (error) {
      const err = error as IError;
      toast.error(
        err.data?.message || "Failed to send message. Please try again later."
      );
    }
  }

  return (
    <section
      className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16"
      style={{
        backgroundImage: `url(${aboutBg.src})`,
      }}
    >
      <div className="max-w-4xl mx-auto">
        <h2 className="text-center text-xl md:text-2xl font-semibold leading-tight text-gray-900 mb-4 sm:mb-6">
          CONTACT OUR J&K CABINETRY TEAM
        </h2>
        <p className="text-center text-sm sm:text-base text-gray-600 mb-6 sm:mb-12">
          We will respond to your inquiry within a 24 hour period!
        </p>

        {isSuccess && (
          <div className="mb-4 p-3 bg-green-100 text-green-700 rounded-md">
            Your message has been sent successfully!
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="space-y-4 sm:space-y-6"
          >
            <FormField
              control={form.control}
              name="fullName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name *</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your name" {...field} />
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
                  <FormLabel>Email *</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="phoneNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone Number *</FormLabel>
                  <FormControl>
                    <Input placeholder="111-222-3333" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              <FormField
                control={form.control}
                name="customerType"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Customer Type *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Customer Type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          { id: "contractor", name: "Contractor" },
                          { id: "showroom", name: "Showroom" },
                          {
                            id: "builderDeveloper",
                            name: "Builder / Developer",
                          },
                          { id: "distributor", name: "Distributor" },
                          { id: "retailer", name: "Retailer (w/ a Showroom)" },
                          { id: "onlineRetailer", name: "Online Retailer" },
                          { id: "other", name: "Other" },
                        ].map((type) => (
                          <SelectItem key={type.id} value={type.id}>
                            {type.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="nearestLocation"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Nearest J&K Location *</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Nearest J&K Location" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {[
                          { id: "connecticut", name: "Connecticut" },
                          { id: "maine", name: "Maine" },
                          { id: "massachusetts", name: "Massachusetts" },
                          { id: "new_hampshire", name: "New Hampshire" },
                          { id: "new_york", name: "New York" },
                          { id: "rhode_island", name: "Rhode Island" },
                          { id: "vermont", name: "Vermont" },
                        ].map((location) => (
                          <SelectItem key={location.id} value={location.id}>
                            {location.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="howHearAboutUs"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>How Did You Hear About Us? *</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="w-full">
                        <SelectValue placeholder="How Did You Hear About Us" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {[
                        { id: "google", name: "Google / Search Engine" },
                        { id: "social", name: "Social Media" },
                        { id: "advertisement", name: "Advertisement" },
                        { id: "referral", name: "Referral" },
                        { id: "word_of_mouth", name: "Word of Mouth" },
                        { id: "other", name: "Other" },
                      ].map((source) => (
                        <SelectItem key={source.id} value={source.id}>
                          {source.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Message *</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your message here"
                      className="min-h-32 w-full resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              className="w-full bg-primary rounded py-4 sm:py-7 text-base cursor-pointer"
              disabled={isLoading}
            >
              {isLoading ? "Sending..." : "Send Message"}
            </Button>
          </form>
        </Form>
      </div>
    </section>
  );
};
export default ContactForm;
