import React from "react";
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";
import FadeUpOnScroll from "../components/FadeUpOnScroll"; // ✅ Import fade

const FAQ = () => {
  const faqs = [
    {
      question: "How do I upload images or videos?",
      answer:
        "Go to your Dashboard, click on the 'Upload' button, select your files, and confirm. Supported formats include JPG, PNG, MP4, and more.",
    },
    {
      question: "Can I organize my media files into folders?",
      answer:
        "Yes! You can create folders and categorize your media files for easier management in the Dashboard.",
    },
    {
      question: "Is my media stored securely?",
      answer:
        "Absolutely. All media files are encrypted both in transit and at rest. Only you have access to your files.",
    },
    {
      question: "How do I reset my password?",
      answer:
        "Click on 'Forgot Password' at the login page, enter your email, and follow the instructions to reset your password.",
    },
    {
      question: "Can I share my media with others?",
      answer:
        "Yes, you can generate shareable links for your media. You can control access permissions and expiration dates.",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#f9fafb", py: 8 }}>
      <Container maxWidth="md">
        {/* Header */}
        <FadeUpOnScroll>
          <Typography variant="h3" align="center" gutterBottom sx={{ fontWeight: "bold" }}>
            Frequently Asked Questions
          </Typography>
        </FadeUpOnScroll>

        <FadeUpOnScroll>
          <Typography variant="h6" align="center" color="text.secondary" paragraph>
            Find answers to common questions about using Personal Media Manager.
          </Typography>
        </FadeUpOnScroll>

        {/* FAQ List */}
        <Box sx={{ mt: 4 }}>
          {faqs.map((faq, index) => (
            <FadeUpOnScroll key={index}>
              <Accordion>
                <AccordionSummary
                  expandIcon={<ExpandMore />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  <Typography sx={{ fontWeight: "bold" }}>{faq.question}</Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography color="text.secondary">{faq.answer}</Typography>
                </AccordionDetails>
              </Accordion>
            </FadeUpOnScroll>
          ))}
        </Box>
      </Container>
    </Box>
  );
};

export default FAQ;
