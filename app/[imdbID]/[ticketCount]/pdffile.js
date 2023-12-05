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
    width: "100%",
    height: "100%",
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
  headingdiv: {
    backgroundColor: "#E14658",
    height: "100px",
    width: "100%",
  },
  heading: {
    display: "flex",
    color: "#fff",
    fontSize: "24px",
    fontWeight: "bold",
    marginLeft: "32px",
    marginTop: "32px",
    alignItems: "center",
    justifyContent: "center",
  },
  div1: {
    display: "flex",
    margin: "20px",
  },
  invoice: {
    fontWeight: "bold",
    fontSize: "20px",
    color: "#000",
  },
  div2: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    margin: "20px",
    color: "#556987",
  },
  invoiceto: {
    display: "flex",
    fontSize: "18px",
  },
  invoiceID: {
    display: "flex",
    marginLeft: "auto",
    fontSize: "18px",
  },
});

const PDFDocument = ({
  poster,
  title,
  type,
  name,
  city,
  country,
  ticketCount,
}) => {
  if (
    !poster ||
    !title ||
    !type ||
    !name ||
    !city ||
    !country ||
    !ticketCount
  ) {
    return <div>Error: Incomplete data for PDF</div>;
  }
  const currentDate = new Date();

  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <div style={styles.headingdiv}>
          <Text style={styles.heading}>TickTicketing</Text>
        </div>
        <div style={styles.div1}>
          <Text style={styles.invoice}>Invoice</Text>
        </div>
        <div style={styles.div2}>
          <Text style={styles.invoiceto}>Invoice to {name}</Text>
          <Text style={styles.invoiceID}>Invoice ID: 1</Text>
        </div>
        <div style={styles.div2}>
          <Text style={styles.invoiceto}>{city}</Text>
          <Text style={styles.invoiceID}>
            Order date: {currentDate.toLocaleDateString()}
          </Text>
        </div>
        <div style={styles.div2}>
          <Text style={styles.invoiceto}>{country}</Text>
        </div>
        {/* Details panel */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "20px",
            marginRight: "20px",
            backgroundColor: "#F7F8F9",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <Text
            style={{
              display: "flex",
              width: "39px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            #
          </Text>
          <Text
            style={{
              display: "flex",
              width: "224px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            Event Detail
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            Event Type
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            Ticket
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            Unit Price
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            Discount
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            Total
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "20px",
            marginRight: "20px",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <Text
            style={{
              display: "flex",
              width: "39px",
              fontSize: "14px",
              color: "#000",
            }}
          >
            1
          </Text>
          <Text
            style={{
              display: "flex",
              width: "224px",
              fontSize: "14px",
              color: "#000",
            }}
          >
            {title}
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#000",
            }}
          >
            {type}
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#000",
            }}
          >
            x{ticketCount}
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#000",
            }}
          >
            $500.00
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#000",
            }}
          >
            $0.00
          </Text>
          <Text
            style={{
              display: "flex",
              width: "140px",
              fontSize: "14px",
              color: "#556987",
            }}
          >
            ${ticketCount * 500 + 0.13 * 500 * ticketCount}.00
          </Text>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            marginLeft: "20px",
            marginRight: "20px",
            border: "1px solid #ddd",
            padding: "10px",
          }}
        >
          <Text
            style={{
              paddingVertical: "20px",
              fontWeight: "bold",
              display: "flex",
              marginLeft: "auto",
              marginRight: "20px",
              fontSize: "24px",
              color: "#000",
            }}
          >
            Invoice Total : USD ${ticketCount * 500 + 0.13 * 500 * ticketCount}
            .00
          </Text>
        </div>
        {/* Dotted line */}
        <div
          style={{
            paddingVertical: "20px",
            display: "flex",
            flexDirection: "row",
            marginLeft: "20px",
            marginRight: "20px",
            borderBottom: "3px dotted #ddd",
            height: "1px",
          }}
        />
        {Array.from({ length: ticketCount }).map((_, index) => (
          <div key={index} style={{ display: "flex" }}>
            <Text></Text>
          </div>
        ))}
      </Page>
    </Document>
  );
};

export default PDFDocument;
