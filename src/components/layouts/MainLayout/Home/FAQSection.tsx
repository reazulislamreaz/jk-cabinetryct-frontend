// components/FAQSection.tsx
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import aboutBg from "@/assets/home/about/jk-bg.png";
const FAQSection = () => {
  const faqs = [
    {
      question: "Who sells J & K Cabinets?",
      answer:
        "We’re everywhere! Find your nearest J&K Cabinetry location to see our products in person or have them shipped directly to you.",
    },
    {
      question: "Where Can I Find J&K Wholesalers?",
      answer:
        "J&K Cabinetry has multiple locations across the US. You can find the list of our locations here.",
    },
    {
      question: "How to buy cabinets wholesale?",
      answer:
        "Create an account on our website or contact us directly for a quick and easy ordering process.",
    },
    {
      question: "How much are cabinets wholesale?",
      answer:
        "While focusing on providing a higher quality cabinet we are still competitive to low grade or builder grade pricing. Talk to our team to learn more.",
    },
    {
      question: "How to install cabinets?",
      answer:
        "While JK Cabinetry doesn’t offer direct installation services, we can connect you with a network of highly skilled installers who specialize in our products.",
    },
  ];
  return (
    <section
      className="w-full px-4 sm:px-6 py-8 sm:py-12 lg:py-16 "
      style={{
        backgroundImage: `url(${aboutBg.src})`,
      }}
    >
      <div className="max-w-6xl mx-auto px-4 ">
        <h2 className="text-center text-xl md:text-2xl font-semibold leading-tight text-gray-900  mb-12">
          J AND K CABINETS FREQUENTLY ASKED QUESTIONS
        </h2>
        <Accordion type="single" collapsible>
          {faqs?.map((q, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-gray-400 px-3"
            >
              <AccordionTrigger className="text-left font-semibold text-base cursor-pointer hover:no-underline">
                {q.question}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 ">
                {q.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
};

export default FAQSection;
