import React from "react";
import Layout from "../src/ui-components/layout";
import Dropzone from "../src/Pages/Upload";

const Upload = () => {
  return (
    <Layout>
      <Dropzone className="p-16 mt-10 border border-neutral-200" />
    </Layout>
  );
};

export default Upload;
