import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { subscriptionPlans } from "@/utils/plans";
import { cn } from "@/lib/utils";
import { PlanSubscriptionButton } from "./plans-subscription-button";

type Plan = "BASIC" | "PROFESSIONAL" | "ENTERPRISE";

export function PlansGrid() {
  return (
    <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mx-auto lg:mx-0 gap-6 p-6">
      {subscriptionPlans.map((plan, index) => {
        const isPromo = index === 1;

        return (
          <Card
            key={plan.id}
            className={cn(
              "relative transition-transform duration-300 hover:scale-[1.02] shadow-md border p-4",
              isPromo
                ? "border-primary shadow-primary/20 bg-primary/10"
                : "border-gray-200"
            )}
          >
            {isPromo && (
              <div className="absolute top-2 right-2 bg-primary/80 text-white text-xs font-bold px-2 py-1 rounded shadow">
                Promoção exclusiva
              </div>
            )}

            <CardHeader>
              <CardTitle
                className={cn(
                  "text-xl font-bold",
                  isPromo ? "text-primary" : "text-gray-800"
                )}
              >
                {plan.name}
              </CardTitle>
              <CardDescription>{plan.description}</CardDescription>
            </CardHeader>

            <CardContent>
              <ul className="rounded-lg p-4 space-y-3">
                {plan.features.map((feature, idx) => (
                  <li
                    key={idx}
                    className="flex items-start gap-3 text-sm text-gray-800"
                  >
                    <span
                      className={cn(
                        "mt-1 h-2 w-2 rounded-full",
                        isPromo ? "bg-green-500" : "bg-green-200"
                      )}
                    />
                    {feature}
                  </li>
                ))}
              </ul>
              <div className="px-6">
                <p className="text-lg text-muted-foreground line-through">
                  {plan.price}
                </p>
                <p className="text-2xl font-bold text-primary">
                  {plan.descountPrice}
                </p>
              </div>

              <CardFooter>
                <PlanSubscriptionButton
                  type={plan.id as Plan}
                  isPromo={isPromo}
                />
              </CardFooter>
            </CardContent>
          </Card>
        );
      })}
    </section>
  );
}
