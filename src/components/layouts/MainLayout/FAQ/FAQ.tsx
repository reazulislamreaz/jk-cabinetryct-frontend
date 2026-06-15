// components/faq/FAQSection.tsx
"use client";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    question: "How do I open an account?",
    answer:
      "You can open a wholesale account by clicking the 'Open Account' button on our homepage and filling out the short application form. Our team reviews and approves most accounts within 24–48 hours.",
  },
  {
    question:
      "Do you sell J&K cabinets directly to homeowners or to the general public?",
    answer:
      "We are a wholesale-only supplier. We do not sell directly to the public. However, homeowners can purchase through one of our authorized dealers, contractors, or kitchen & bath showrooms across the country.",
  },
  {
    question:
      "Can I see the pricelist of J and K Cabinetry before opening an account?",
    answer:
      "No, pricing is only visible after your wholesale account is approved. This helps us maintain fair pricing for all our dealer partners.",
  },
  {
    question: "Do you offer custom cabinetry?",
    answer:
      "We do not offer fully custom cabinets, but we do offer semi-custom modifications such as size changes, custom paint matching, and special trim options at our warehouse for an additional fee.",
  },
  {
    question: "Does J&K Cabinetry sell countertops?",
    answer:
      "No, we specialize only in high-quality RTA cabinetry. We do not sell countertops, hardware, or appliances.",
  },
  {
    question: "Can you come out to do measurements or installations?",
    answer:
      "We are a warehouse and distribution company. We do not offer measuring or installation services. We can connect you with trusted local contractors who carry our line.",
  },
  {
    question: "Can your team do kitchen or bathroom layout designs?",
    answer:
      "Yes! Our professional design team offers FREE 2D & 3D kitchen and bathroom layouts for all approved dealers and their clients.",
  },
  {
    question: "Do you have door samples available?",
    answer:
      "Yes! We offer physical door samples in all colors and styles. Contact your local J&K dealer or our sales team to order samples.",
  },
  {
    question:
      "Where can I see all of the cabinets that are in your collection?",
    answer:
      "You can view our full catalog online after logging into your approved account. Physical displays are also available at all J&K warehouse locations and partner showrooms.",
  },
  {
    question: "Do all of your cabinets have premium features already included?",
    answer:
      "Yes! Every J&K cabinet comes standard with soft-close doors and drawers, full-extension glides, dovetail drawers, and plywood boxes — no upgrades needed!",
  },
  {
    question: "Do you have cabinets that we can stain or paint over?",
    answer:
      "Yes, our Natural Birch and Paint-Grade lines are designed to be stained or painted to match any color.",
  },
  {
    question: "Can I get a certain door style in a different color?",
    answer:
      "Most door styles are available in all colors. Some exceptions apply to specialty finishes. Check with our team for availability.",
  },
  {
    question: "What type of wood or materials do you use in your cabinets?",
    answer:
      "We use only solid hardwood (birch) faces, plywood boxes, and solid wood drawer boxes. No particle board or MDF in structural components.",
  },
  {
    question: "What is your typical lead time for orders?",
    answer:
      "Average lead time is 5–7 business days from order placement to shipping from our warehouse. Most in-stock orders ship within 1–3 days!",
  },
  {
    question:
      "How do I maintain and keep my J&K cabinets clean to ensure longevity?",
    answer:
      "Use a soft, damp cloth with mild soap and water. Avoid harsh chemicals, ammonia, or abrasive pads. Always dry surfaces immediately. See our full Care Guide here.",
  },
  {
    question: "Can you do delivery?",
    answer:
      "Yes! We offer delivery to residential and commercial addresses across the continental US via freight carrier. Lift gate and inside delivery available.",
  },
  {
    question:
      "What is your return or exchange policy for damaged or incorrect J & K cabinets?",
    answer:
      "We have a hassle-free claims process. Report any damage or incorrect items within 7 days of delivery with photos, and we'll replace them at no cost.",
  },
  {
    question: "Do your J and K cabinets come with a warranty?",
    answer:
      "Yes! All J&K cabinets come with a Limited Lifetime Warranty for the original purchaser against manufacturing defects.",
  },
];

const FAQ = () => {
  return (
    <section className="py-16 md:py-24 bg-linear-to-br from-gray-50 to-white min-h-screen">
      <div className="max-w-5xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-16 max-w-xl mx-auto">
          <h1 className="text-2xl md:text-3xl  uppercase leading-relaxed">
            what are rta cabinets? <br /> j and k cabinet (FAQ) <br /> frequently Asked
            Questions
          </h1>
        </div>

        {/* Dynamic Accordion */}
        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem
              key={index}
              value={`item-${index}`}
              className="bg-white rounded-xl cursor-pointer border border-gray-200"
            >
              <AccordionTrigger className="px-5 py-6 text-base md:text-lg  font-medium text-gray-800 hover:no-underline cursor-pointer">
                <span className="pr-8">{faq.question}</span>
              </AccordionTrigger>
              <AccordionContent className="px-5 pb-8 pt-2 text-gray-600 text-sm md:text-base leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};
export default FAQ;
