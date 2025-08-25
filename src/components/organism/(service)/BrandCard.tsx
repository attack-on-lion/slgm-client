import { cn } from "fast-jsx/util";
import Image from "next/image";
import { useState } from "react";

interface BrandCardProps {
	brand: {
		storeId: number;
		storeName: string;
		logoUrl: string;
		categoryId: number;
		categoryName: string;
	};
	option?: {
		isBig?: boolean;
	};
}

export default function BrandCard({ brand, option }: BrandCardProps) {
	const [imageError, setImageError] = useState(false);

	const container = {
		display: 'flex flex-col',
		size: option?.isBig ? 'w-full h-[200px]' : 'w-[160px] h-[120px]',
		background: 'bg-white',
		boundary: 'rounded-[12px]',
		shadow: 'shadow-sm',
		overflow: 'overflow-hidden',
	};

	const imageContainer = {
		size: option?.isBig ? 'w-full h-[140px]' : 'w-full h-[80px]',
		background: 'bg-gray-100',
		display: 'flex items-center justify-center',
	};

	const contentContainer = {
		display: 'flex flex-col justify-center',
		padding: 'px-[12px] py-[8px]',
		size: 'w-full flex-1',
	};

	const handleImageError = () => {
		setImageError(true);
	};

	return (
		<div className={cn(container)}>
			<div className={cn(imageContainer)}>
				{brand.logoUrl && !imageError ? (
					<Image
						src={brand.logoUrl}
						alt={brand.storeName}
						width={option?.isBig ? 200 : 120}
						height={option?.isBig ? 140 : 80}
						className="object-cover w-full h-full"
						onError={handleImageError}
						unoptimized
					/>
				) : (
					<div className="flex items-center justify-center w-full h-full text-gray-400 bg-gray-50">
						<div className="text-center">
							<div className="text-2xl mb-1">🏪</div>
							<div className="text-xs">{brand.storeName.charAt(0)}</div>
						</div>
					</div>
				)}
			</div>
			<div className={cn(contentContainer)}>
				<div className="text-[14px] font-medium text-text truncate">
					{brand.storeName}
				</div>
				<div className="text-[12px] text-sub-title-2 truncate">
					{brand.categoryName}
				</div>
			</div>
		</div>
	);
}
