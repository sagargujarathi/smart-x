import Quote from "./quote";

const QUOTES = [
  "Patience is not simply the ability to wait - it's how we behave while we're waiting. - Joyce Meyer",
  "Good things come to those who wait.",
  "The best things in life are worth waiting for.",
  "Great things take time.",
  "Success is the sum of small efforts, repeated day in and day out. - Robert Collier",
  "Patience is a virtue.",
  "All things are difficult before they are easy. - Thomas Fuller",
  "Your patience will be rewarded.",
  "One moment of patience may ward off great disaster. One moment of impatience may ruin a whole life. - Chinese Proverb",
  "Patience is not the ability to wait, but the ability to keep a good attitude while waiting. - Joyce Meyer",
  "The two most powerful warriors are patience and time. - Leo Tolstoy",
  "Patience is bitter, but its fruit is sweet. - Aristotle",
  "Adopt the pace of nature: her secret is patience. - Ralph Waldo Emerson",
  "Have patience. All things are difficult before they become easy. - Saadi",
  "With love and patience, nothing is impossible. - Daisaku Ikeda",
  "Patience is the companion of wisdom. - St. Augustine",
  "Patience is the key to contentment.",
  "Patience and perseverance have a magical effect before which difficulties disappear and obstacles vanish. - John Quincy Adams",
  "Patience is the best remedy for every trouble. - Plautus",
  "A man who is a master of patience is master of everything else. - George Savile",
  "He that can have patience can have what he will. - Benjamin Franklin",
  "Patience is necessary, and one cannot reap immediately where one has sown. - Soren Kierkegaard",
  "Patience is the art of hoping. - Luc de Clapiers",
  "To lose patience is to lose the battle. - Mahatma Gandhi",
  "Patience is not passive, on the contrary, it is active; it is concentrated strength. - Edward G. Bulwer-Lytton",
  "Patience and fortitude conquer all things. - Ralph Waldo Emerson",
  "Patience is the key to paradise. - Turkish Proverb",
  "Patience is a conquering virtue. - Geoffrey Chaucer",
  "The key to everything is patience. You get the chicken by hatching the egg, not by smashing it. - Arnold H. Glasow",
  "Patience is also a form of action. - Auguste Rodin",
  "Patience is the support of weakness; impatience the ruin of strength. - Charles Caleb Colton",
  "All men commend patience, although few are willing to practice it. - Thomas à Kempis",
  "How poor are they that have not patience! What wound did ever heal but by degrees? - William Shakespeare",
];

const LoadingPage = () => (
  <div className="min-h-screen flex items-center justify-center px-4 w-full col-span-full">
    <div className="text-center max-w-2xl">
      <svg
        className="animate-spin h-12 w-12 text-zinc-600 mx-auto mb-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        />
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <p className="text-lg text-white/80 mb-3">
        Please wait while loading page
      </p>
      <p className="text-sm text-zinc-500 italic">
        <Quote data={QUOTES} />
      </p>
    </div>
  </div>
);

export default LoadingPage;
