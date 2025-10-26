import React, { useRef } from 'react';
import Banner from '../../Components/Banner/Banner';
import VolunteerNeeds from '../../Components/VolunteerNeeds/VolunteerNeeds';
import Faq from '../../Components/Faq/Faq';
import Testimonials from '../../Components/Testimonials/Testimonials';
import { Typewriter } from 'react-simple-typewriter';
import { motion, useInView } from 'framer-motion';
import { useLoaderData } from 'react-router';
import { useQuery } from '@tanstack/react-query';
import Loader from '../../Components/Loader/Loader';

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } }
};

const Section = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <motion.div
      ref={ref}
      variants={fadeInUp}
      initial="hidden"
      animate={isInView ? 'visible' : 'hidden'}
      style={{ overflow: 'hidden' }}
    >
      {children}
    </motion.div>
  );
};

const Home = () => {

  const { isLoading, isError, data: postsPromise = [] } = useQuery({
    queryKey: ['volunteers'],
    queryFn: async () => {
      const res = await fetch("https://volunteerly-server-side.vercel.app/volunteers");
      return res.json();
    },

  });
  if (isLoading) return <Loader />;
  if (isError) return <p className="text-center text-red-500">Failed to load your posts.</p>;

  return (
    <div className="p-4 space-y-20">
      <Section>
        <Banner postsPromise={postsPromise} />
      </Section>

      <Section>
        <VolunteerNeeds />
      </Section>

      <Section>
        <h2 className="text-3xl text-primary font-bold text-center mb-12">
          Frequently Asked{' '}
          <span className="text-secondary">
            <Typewriter
              words={[' Questions.']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h2>
        <Faq />
      </Section>

      <Section>
        <h2 className="text-3xl text-primary font-bold text-center mb-12">
          Client
          <span className="text-secondary">
            <Typewriter
              words={[' Reviews.']}
              loop={true}
              cursor
              cursorStyle="|"
              typeSpeed={60}
              deleteSpeed={40}
              delaySpeed={1500}
            />
          </span>
        </h2>
        <Testimonials />
      </Section>
    </div>
  );
};

export default Home;
