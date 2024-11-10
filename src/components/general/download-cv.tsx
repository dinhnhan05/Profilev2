"use client";

import Button from "@/components/general/button";

const DownloadCV = () => {
  return (
    // <Button onClick={() => window?.open('https://github.com/prince-63/bio/tree/main/public/files/Resume.pdf', '_blank')}>
    //   Get Resume
    // </Button>
    <Button>
      <a href="https://github.com/prince-63/bio/tree/main/" download>
        Source Code 
      </a>
    </Button>
  );
};

export default DownloadCV;
