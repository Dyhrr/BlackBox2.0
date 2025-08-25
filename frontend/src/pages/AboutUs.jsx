import { Card, CardContent } from "@/components/ui/card";

export default function AboutUs() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-4">About BlackBox Casino</h1>
      <Card className="shadow-md rounded-2xl">
        <CardContent className="p-6 space-y-4">
          <p>
            BlackBox Casino was created by Torn players, for Torn players. Our
            goal has always been simple: run a fair, transparent casino that
            people can trust.
          </p>
          <p>
            We know how easy it is to be skeptical. That’s why we’ve made trust
            the foundation of everything we do. Every raffle, every giveaway,
            and every payout is logged publicly on the Torn forums and in our
            Discord. If you win, you’ll see it announced, verified, and paid —
            in full, every time.
          </p>
          <p>
            Since opening, we’ve delivered prizes ranging from Donator Packs and
            rare collectibles to Private Islands and billions in Torn cash. Our
            track record speaks for itself: no missed payouts, no excuses, no
            scams.
          </p>
          <p>
            At BlackBox Casino, you’re not just buying a ticket or spinning a
            wheel — you’re part of a community that values fairness and
            integrity. That’s what sets us apart.
          </p>
          <p className="font-semibold">
            BlackBox Casino — fair games, real prizes, full transparency.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
