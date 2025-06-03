import { StarIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import React from "react";

interface TestimonialProps {
  quote: string;
  author: string;
  title: string;
  company: string;
  rating: number;
  imageSrc: string;
}

const Testimonial: React.FC<TestimonialProps> = ({
  quote,
  author,
  title,
  company,
  rating,
  imageSrc,
}) => {
  return (
    <div className="bg-secondary p-6 rounded-lg border border-muted-foreground hover:border-primary flex flex-col justify-between transition-all">
      <div className="flex mb-4">
        {[...Array(5)].map((_, i) => (
          <StarIcon
            key={i}
            className={`h-5 w-5 ${
              i < rating ? "text-primary fill-primary" : "text-muted-foreground"
            }`}
          />
        ))}
      </div>
      <p className="text-muted-foreground mb-6">&quot;{quote}&quot;</p>
      <div className="flex items-center">
        <Image
          src={imageSrc}
          alt={author}
          width={48}
          height={48}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="ml-4">
          <h4 className="font-semibold text-white">{author}</h4>
          <p className="text-sm text-accent-foreground">
            {title}, {company}
          </p>
        </div>
      </div>
    </div>
  );
};

const Testimonials: React.FC = () => {
  const t = useTranslations("Testimonials");
  const testimonials = [
    {
      quote: t("1.quote"),
      author: "Sarah Johnson",
      title: "CIO",
      company: "Global Retailers Inc.",
      rating: 5,
      imageSrc:
        "https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      quote: t("2.quote"),
      author: "Michael Chen",
      title: "IT Director",
      company: "TechFusion Labs",
      rating: 5,
      imageSrc:
        "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
    {
      quote: t("3.quote"),
      author: "Emma Rodriguez",
      title: "Security Officer",
      company: "First National Bank",
      rating: 4,
      imageSrc:
        "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150",
    },
  ];

  return (
    <section id="testimonials" className="py-20 bg-secondary">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            {t("titleStart")}{" "}
            <span className="text-orange-500">{t("titleEnd")}</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Testimonial
              key={index}
              quote={testimonial.quote}
              author={testimonial.author}
              title={testimonial.title}
              company={testimonial.company}
              rating={testimonial.rating}
              imageSrc={testimonial.imageSrc}
            />
          ))}
        </div>

        {/* <div className="py-10 border-t border-b border-muted-foreground">
          <div className="flex flex-wrap justify-center items-center gap-8 md:gap-16">
            {logos.map((logo, index) => (
              <div
                key={index}
                className={`${logo.width} h-12 bg-gray-700/50 rounded flex items-center justify-center text-gray-400`}
              >
                {logo.name}
              </div>
            ))}
          </div>
        </div> */}
      </div>
    </section>
  );
};
export default Testimonials;
