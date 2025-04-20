import React from 'react';
import { Container, Typography, Card, CardContent } from '@mui/material';

function Results() {
  const results = JSON.parse(localStorage.getItem('careerResults')) || [];

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Recommended Career Paths
      </Typography>
      {results.map((career, index) => (
        <Card key={index} style={{ marginTop: '1rem' }}>
          <CardContent>
            <Typography variant="h6">{career.title}</Typography>
            <Typography variant="body2">{career.description}</Typography>
          </CardContent>
        </Card>
      ))}
    </Container>
  );
}

export default Results;
