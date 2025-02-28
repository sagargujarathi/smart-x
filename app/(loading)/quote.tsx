"use client";

import React, { useEffect } from "react";

interface IQuoteType {
  data: string[];
}
const Quote = ({ data }: IQuoteType) => {
  const [quote, setQuote] = React.useState<string>(data[0]);

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * data.length);
    setQuote(data[randomIndex]);
  }, [data]);
  return <>{quote}</>;
};

export default Quote;
