"use client";

import Link from "next/link";
import { Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export type CampaignStatus =
  | "active"
  | "pending_verification"
  | "in_revision"
  | "completed"
  | "draft";

interface CampaignCardProps {
  id: string;
  title: string;
  imageUrl: string;
  category: string;
  location: string;
  raisedAmount: number;
  goalAmount: number;
  progress: number;
  status: CampaignStatus;
}

export function CampaignCard({
  id,
  title,
  imageUrl,
  category,
  location,
  raisedAmount,
  goalAmount,
  progress,
  status,
}: CampaignCardProps) {
  const getStatusLabel = (status: CampaignStatus) => {
    switch (status) {
      case "active":
        return { label: "Activa", color: "text-green-600 bg-green-100" };
      case "pending_verification":
        return { label: "Sin Verificar", color: "text-blue-600 bg-blue-100" };
      case "in_revision":
        return { label: "En Revisión", color: "text-purple-600 bg-purple-100" };
      case "completed":
        return { label: "Finalizada", color: "text-red-600 bg-red-100" };
      default:
        return { label: "Borrador", color: "text-gray-600 bg-gray-100" };
    }
  };

  const statusInfo = getStatusLabel(status);

  // Use imageUrl from props and fallback to placeholder if not available
  const imageSrc = imageUrl || "/amboro-main.jpg";

  return (
    <div className="rounded-lg overflow-hidden bg-white border border-gray-100 hover:shadow-md transition-all">
      <div className="relative">
        {/* Campaign Image */}
        <div className="h-40 relative">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 384px"
          />
        </div>
      </div>

      <div className="p-4">
        {/* Status indicator with verified check for active campaigns */}
        <div className="flex items-center gap-2 mb-3">
          {status === "active" && (
            <Image
              src="/icons/verified.svg"
              alt="Verified"
              width={30}
              height={30}
            />
          )}
          <span
            className={`text-xs font-medium py-1 px-2 rounded-full ${statusInfo.color} flex items-center gap-1`}
          >
            <span className="text-lg inline-block leading-none">•</span>{" "}
            {statusInfo.label}
          </span>
        </div>

        {/* Campaign Title */}
        <h3 className="text-lg font-medium text-[#2c6e49] mb-2">
          <Link href={`/campaigns/${id}`} className="hover:underline">
            {title}
          </Link>
        </h3>

        {/* Category and Location */}
        <div className="flex text-sm text-gray-600 mb-4">
          <span className="mr-4">{category}</span>
          <span>{location}</span>
        </div>

        {/* Amount Raised */}
        <div className="mb-2 flex justify-between text-sm">
          <span className="text-gray-600">Recaudado</span>
          <span className="font-medium">
            Bs. {raisedAmount.toLocaleString()} de {goalAmount.toLocaleString()}
          </span>
        </div>

        {/* Progress Bar */}
        <div className="w-full bg-gray-200 h-2 rounded-full mb-1">
          <div
            className="bg-[#2c6e49] h-2 rounded-full"
            style={{ width: `${progress}%` }}
          ></div>
        </div>

        {/* Progress Percentage */}
        <div className="text-right text-sm text-gray-500 mb-4">{progress}%</div>

        {/* Admin Button - now borderless and at the start of the line */}
        <div className="flex justify-start">
          <Button
            variant="ghost"
            size="sm"
            className="text-[#2c6e49] hover:bg-[#f0f7f1] flex items-center justify-center gap-2 px-0 font-bold"
            asChild
          >
            <Link href={`/dashboard/campaigns/${id}`}>
              Administrar Campaña
              <Edit className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
