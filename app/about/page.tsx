"use client"

import { Card } from "@/components/ui/card"
import { ChefHat, Users, Lightbulb, Award } from "lucide-react"
import { motion } from "framer-motion"

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 container mx-auto px-4 py-12">
        <motion.div className="max-w-4xl mx-auto" variants={containerVariants} initial="hidden" animate="visible">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-primary mb-4">About Savory Stories</h1>
            <p className="text-lg text-muted-foreground">
              Connecting passionate chefs with food enthusiasts around the world
            </p>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <Card className="p-8 bg-card">
              <h2 className="text-2xl font-bold text-foreground mb-4">Our Mission</h2>
              <p className="text-muted-foreground leading-relaxed mb-4">
                Savory Stories is a vibrant platform dedicated to celebrating culinary creativity and connecting food
                lovers. Our mission is to bridge the gap between professional chefs who are passionate about sharing
                their craft and home cooks seeking inspiration, guidance, and delicious recipes.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                We believe that food brings people together, and every recipe tells a story. Through Savory Stories,
                chefs can showcase their unique culinary perspectives, while guests can discover, learn, and enjoy
                mouth-watering recipes from around the globe.
              </p>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <h2 className="text-2xl font-bold text-foreground mb-6">Why Choose Savory Stories?</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="p-6">
                <div className="flex gap-4">
                  <ChefHat className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Professional Chefs</h3>
                    <p className="text-sm text-muted-foreground">
                      Connect with verified culinary professionals who share their expertise and authentic recipes.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Users className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Community Driven</h3>
                    <p className="text-sm text-muted-foreground">
                      Join a passionate community of food enthusiasts who celebrate culinary diversity.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Lightbulb className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Inspiration Daily</h3>
                    <p className="text-sm text-muted-foreground">
                      Discover new recipes, cooking techniques, and culinary trends delivered to your inbox.
                    </p>
                  </div>
                </div>
              </Card>

              <Card className="p-6">
                <div className="flex gap-4">
                  <Award className="h-8 w-8 text-primary flex-shrink-0 mt-1" />
                  <div>
                    <h3 className="font-semibold text-foreground mb-2">Quality Content</h3>
                    <p className="text-sm text-muted-foreground">
                      Access tested recipes with detailed instructions, tips, and beautiful photography.
                    </p>
                  </div>
                </div>
              </Card>
            </div>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <Card className="p-8 bg-card">
              <h2 className="text-2xl font-bold text-foreground mb-4">For Chefs</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Are you a culinary professional? Savory Stories provides the perfect platform to showcase your
                expertise, build your personal brand, and connect with food enthusiasts who appreciate your work.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Share your original recipes and cooking techniques</li>
                <li>• Build a professional profile showcasing your culinary style</li>
                <li>• Reach a growing audience of food lovers and potential clients</li>
                <li>• Get notified when your followers enjoy your content</li>
              </ul>
            </Card>
          </motion.div>

          <motion.div variants={itemVariants} className="mb-12">
            <Card className="p-8 bg-card">
              <h2 className="text-2xl font-bold text-foreground mb-4">For Guests</h2>
              <p className="text-muted-foreground leading-relaxed mb-3">
                Are you passionate about food? Subscribe to our newsletter and never miss out on amazing recipes and
                culinary stories from professional chefs around the world.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>• Discover recipes from diverse cuisines and cooking styles</li>
                <li>• Learn cooking tips and techniques from experienced professionals</li>
                <li>• Follow your favorite chefs and stay updated with their latest creations</li>
                <li>• Join a community of food enthusiasts and share your experiences</li>
              </ul>
            </Card>
          </motion.div>
        </motion.div>
      </main>
    </div>
  )
}
