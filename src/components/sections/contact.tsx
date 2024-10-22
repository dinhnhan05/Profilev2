"use client";

import { useState } from "react";
import { Copy, Mail, Phone } from "lucide-react";
import { toast } from 'react-toastify';
import SocialIcons from "@/components/data-display/social-icons";
import Tag from "@/components/data-display/tag";
import IconButton from "@/components/general/icon-button";
import Typography from "@/components/general/typography";
import Container from "@/components/layout/container";
import useWindowSize from "@/hooks/use-window-size";
import { copyTextToClipboard } from "@/lib/utils";
import Reavel from "@/hooks/Reavel";
import spaceGrotesk from "../general/space-grotesk-font";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

let email = "kiryosdinhnhan@hotmail.com";
let phone = "+84 397 920 591";

type CopyValue = "email" | "phone";

const ContactSection = () => {
  const { width } = useWindowSize();
  const [isCopied, setIsCopied] = useState(false);
  const [copiedValueType, setCopiedValueType] = useState<CopyValue | null>(null);

  const handleCopyClick = async (text: string, type: CopyValue) => {
    try {
      await copyTextToClipboard(text);
      setIsCopied(true);
      setCopiedValueType(type);

      toast.success(`${type === "email" ? "Email" : "Số điện thoại"} đã được sao chép!`, {
        position: "top-right",
        autoClose: 2000,
      });

      setTimeout(() => {
        setIsCopied(false);
        setCopiedValueType(null);
      }, 1500);
    } catch (error) {
      setIsCopied(false);
      setCopiedValueType(null);
      toast.error("Không thể sao chép!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  return (
    <Container id="contact">
      <ToastContainer 
        position="top-right" 
        autoClose={2000} 
        newestOnTop
      />
      <div className="flex flex-col items-center gap-4">
        <div className="self-center">
          <Tag
            className={`${spaceGrotesk.className} text-xl`}
            label="Liên hệ tôi"
          />
        </div>

        <Reavel>
          <Typography
            variant="subtitle"
            className={`${spaceGrotesk.className} max-w-xl text-center text-lg`}
          >
            Muốn liên hệ tôi? Bạn có thể liên hệ với tôi qua các cách sau:
          </Typography>
        </Reavel>
      </div>

      <div className="flex flex-col items-center gap-6 md:gap-12">
        <div className="flex flex-col items-center md:gap-4">
          <Reavel>
            <div className="flex items-center gap-4 md:gap-5">
              <Mail className="h-6 w-6 md:h-8 md:w-8" />
              <Typography className=" font-medium text-opacity-70" variant="h4">
                {email}
              </Typography>
              <IconButton
                size={width && width < 768 ? "md" : "lg"}
                onClick={() => handleCopyClick(email, "email")}
                showTooltip={isCopied && copiedValueType === "email"}
                tooltipText="Copied!"
              >
                <Copy />
              </IconButton>
            </div>
          </Reavel>

          <Reavel>
            <div className="flex items-center gap-4 md:gap-5">
              <Phone className="h-6 w-6 md:h-8 md:w-8" />
              <Typography className=" font-medium text-opacity-70" variant="h4">
                {phone}
              </Typography>
              <IconButton
                size={width && width < 768 ? "md" : "lg"}
                onClick={() => handleCopyClick(phone.replace(" ", ""), "phone")}
                showTooltip={isCopied && copiedValueType === "phone"}
                tooltipText="Copied!"
              >
                <Copy />
              </IconButton>
            </div>
          </Reavel>
        </div>

        <div className="flex flex-col items-center gap-2">
          <Reavel>
            <Typography
              className={`${spaceGrotesk.className} pb-4 text-center text-lg`}
            >
              Kết nối với tôi qua mạng xã hội ^^!
            </Typography>
          </Reavel>
          <Reavel>
            <SocialIcons />
          </Reavel>
        </div>
      </div>
    </Container>
  );
};

export default ContactSection;
