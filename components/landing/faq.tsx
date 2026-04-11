"use client"

import { Badge } from "@/components/ui/badge"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { LANDING_CONTENT } from "@/lib/constants/landing-content"

export function LandingFAQ() {
  const { faq } = LANDING_CONTENT

  return (
    <section id="faq" className="py-20 md:py-28">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-2xl text-center">
          <Badge variant="secondary" className="mb-4">
            {faq.badge}
          </Badge>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">
            {faq.headline}
          </h2>
        </div>

        <div className="mx-auto max-w-2xl">
          <Accordion type="single" collapsible className="w-full">
            {faq.items.map((item, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left font-medium">
                  {item.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
