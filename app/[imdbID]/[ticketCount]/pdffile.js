import React from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Image,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#fff",
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 10,
  },
  text: {
    fontSize: 16,
    marginBottom: 5,
  },
  image: {
    width: 200,
    height: 200,
    marginBottom: 10,
  },
});

const PDFDocument = ({ movie, name, city, country, ticketCount }) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <Text style={styles.title}>{movie.Title}</Text>
        <Text style={styles.text}>Type: {movie.Type}</Text>
        <Text style={styles.text}>Number of Tickets: {ticketCount}</Text>

        {/* Add more information as needed */}
        <Text style={styles.text}>Name: {name}</Text>
        <Text style={styles.text}>City: {city}</Text>
        {/* Add more fields based on your form data */}
        <Image alt=" Movie Image" style={styles.image} src={movie.Poster} />
      </Page>
    </Document>
  );
};

export default PDFDocument;
