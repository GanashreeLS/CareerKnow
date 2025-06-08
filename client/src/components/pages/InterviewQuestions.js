import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Box,
  Typography,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Accordion,
  AccordionSummary,
  AccordionDetails,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

const FAQInterview = () => {
  const [faqData, setFaqData] = useState([]);

  const [selectedTech, setSelectedTech] = useState("java");
  const [technologies, setTechnologies] = useState([]);

  // const faqData = {
  //   Java: [
  //     {
  //       question: "What is JVM?",
  //       answer:
  //         "JVM stands for Java Virtual Machine, which executes Java bytecode.",
  //     },
  //     {
  //       question: "Difference between JDK and JRE?",
  //       answer: "JDK is a development kit, JRE is for runtime environment only.",
  //     },
  //     {
  //       question: "What is a ClassLoader?",
  //       answer: "ClassLoader loads class files into the JVM during runtime.",
  //     },
  //     {
  //       question: "Explain OOP concepts.",
  //       answer:
  //         "OOP includes inheritance, polymorphism, abstraction, and encapsulation.",
  //     },
  //     {
  //       question: "What is method overloading?",
  //       answer:
  //         "When multiple methods have the same name with different parameters.",
  //     },
  //     {
  //       question: "What is method overriding?",
  //       answer: "Redefining a superclass method in a subclass.",
  //     },
  //     {
  //       question: "What is a constructor?",
  //       answer: "A block that initializes a newly created object.",
  //     },
  //     {
  //       question: "Difference between equals() and ==?",
  //       answer: "Equals() compares content, == compares references.",
  //     },
  //     {
  //       question: "What is an interface?",
  //       answer:
  //         "A reference type with abstract methods that a class must implement.",
  //     },
  //     {
  //       question: "What is a package in Java?",
  //       answer: "A namespace for organizing classes and interfaces.",
  //     },
  //   ],
  //   React: [
  //     {
  //       question: "What is React?",
  //       answer: "A JavaScript library for building user interfaces.",
  //     },
  //     {
  //       question: "What are components?",
  //       answer: "Reusable building blocks of a React UI.",
  //     },
  //     {
  //       question: "What is JSX?",
  //       answer:
  //         "JSX is a syntax extension that allows mixing HTML with JavaScript.",
  //     },
  //     {
  //       question: "What are props?",
  //       answer: "Props are inputs passed to components.",
  //     },
  //     {
  //       question: "What is state?",
  //       answer: "State is an object to hold dynamic data within a component.",
  //     },
  //     {
  //       question: "What is useState?",
  //       answer: "A hook that lets you add state to functional components.",
  //     },
  //     {
  //       question: "What is useEffect?",
  //       answer: "A hook for side effects like data fetching and subscriptions.",
  //     },
  //     {
  //       question: "What is the virtual DOM?",
  //       answer:
  //         "An in-memory representation of the real DOM for efficient updates.",
  //     },
  //     {
  //       question: "Difference between class and functional components?",
  //       answer: "Class components use lifecycle methods, functional use hooks.",
  //     },
  //     {
  //       question: "What is Redux?",
  //       answer:
  //         "A state management library for predictable state in applications.",
  //     },
  //   ],
  //   MongoDB: [
  //     {
  //       question: "What is MongoDB?",
  //       answer: "A NoSQL document database that stores data in BSON format.",
  //     },
  //     {
  //       question: "Difference between MongoDB and SQL?",
  //       answer:
  //         "MongoDB is schema-less and document-oriented; SQL is relational.",
  //     },
  //     {
  //       question: "What is a collection?",
  //       answer: "A group of MongoDB documents, similar to a table in SQL.",
  //     },
  //     {
  //       question: "What is a document?",
  //       answer: "A JSON-like record that stores data in key-value pairs.",
  //     },
  //     {
  //       question: "What is a primary key in MongoDB?",
  //       answer: "The _id field which uniquely identifies a document.",
  //     },
  //     {
  //       question: "How to perform joins in MongoDB?",
  //       answer: "Using the $lookup aggregation operator.",
  //     },
  //     {
  //       question: "What are indexes?",
  //       answer:
  //         "Indexes improve query performance by enabling efficient lookups.",
  //     },
  //     {
  //       question: "What is sharding?",
  //       answer: "A method to distribute data across multiple machines.",
  //     },
  //     {
  //       question: "What is replication?",
  //       answer: "Copying data across multiple servers for high availability.",
  //     },
  //     {
  //       question: "What is the aggregation pipeline?",
  //       answer: "A framework for data transformation and analysis in stages.",
  //     },
  //   ],
  //   PHP: [
  //     {
  //       question: "What is PHP?",
  //       answer: "A server-side scripting language for web development.",
  //     },
  //     {
  //       question: "Difference between echo and print?",
  //       answer: "echo can take multiple parameters; print always returns 1.",
  //     },
  //     {
  //       question: "What is a session in PHP?",
  //       answer: "A way to store user data across multiple pages.",
  //     },
  //     {
  //       question: "What are cookies?",
  //       answer: "Small files stored on the client to remember information.",
  //     },
  //     {
  //       question: "What is PDO?",
  //       answer: "PHP Data Objects – a database access layer for multiple DBs.",
  //     },
  //     {
  //       question: "What is the use of isset()?",
  //       answer: "Checks if a variable is set and not null.",
  //     },
  //     {
  //       question: "Difference between == and ===?",
  //       answer: "== checks value, === checks value and type.",
  //     },
  //     {
  //       question: "What are superglobals?",
  //       answer: "Built-in variables like $_GET, $_POST, $_SESSION.",
  //     },
  //     {
  //       question: "How does error handling work?",
  //       answer: "Using try-catch blocks, set_error_handler, and exceptions.",
  //     },
  //     {
  //       question: "How to connect to MySQL with PHP?",
  //       answer: "Using mysqli or PDO with credentials and host info.",
  //     },
  //   ],
  // };
  const fetchFaqs = async (technology = selectedTech) => {
    try {
      const endpoint = `http://localhost:5000/api/faqs/${technology}`;
      const response = await axios.get(endpoint);
      setFaqData(response.data[0]?.questions);
    } catch (error) {
      console.error("Error fetching FAQs", error);
    }
  };
  const fetchTechnologies = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/faqs");
      const allTechs = [...new Set(response.data.map((f) => f.technology))];
      setTechnologies(allTechs);
    } catch (error) {
      console.error("Error fetching technologies", error);
    }
  };

  useEffect(() => {
    fetchTechnologies();
    fetchFaqs();
  }, []);

  return (
    <Box
      sx={{
        maxWidth: 700,
        mx: "auto",
        mt: 4,
        p: 3,
        bgcolor: "white",
      }}
    >
      <Typography
        variant="h4"
        gutterBottom
        sx={{ textAlign: "center", padding: "0.5em" }}
      >
        Interview FAQ
      </Typography>

      <FormControl fullWidth sx={{ mb: 3 }}>
        <InputLabel>Technology</InputLabel>
        <Select
          value={selectedTech}
          label="Technology"
          onChange={(e) => {
            const selected = e.target.value;
            setSelectedTech(selected);
            fetchFaqs(selected); // 👈 pass selected technology to fetchFaqs
          }}
        >
          {/* <MenuItem value="">All</MenuItem> */}
          {technologies.map((tech, i) => (
            <MenuItem key={i} value={tech} selected>
              {tech}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <Typography variant="h6" gutterBottom>
        {selectedTech} Questions & Answers:
      </Typography>

      {faqData.map((faq, index) => (
        <Accordion key={index} sx={{ mb: 1 }}>
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography>
              {index + 1}. {faq.question}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Typography>{faq.answer}</Typography>
          </AccordionDetails>
        </Accordion>
      ))}
    </Box>
  );
};

export default FAQInterview;
