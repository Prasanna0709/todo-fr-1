import Navbar from "../components/Navbar";
import Cardscontainer from "../components/Cardscontainer";
import Addtaskform from "../components/Addtaskform";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const TasksPage = () => {
  const [showForm, setShowForm] = useState(false);

  return (
    <div className={`relative ${showForm ? "h-screen overflow-hidden" : ""}`}>
      <Navbar onShowForm={() => setShowForm(true)} />
      <Cardscontainer />
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{opacity:0}}
            animate={{opacity:1}}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className={`absolute z-50 backdrop-blur-3xl top-0 left-0 right-0`}
          >
            <Addtaskform onCloseForm={() => setShowForm(false)} />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default TasksPage;
