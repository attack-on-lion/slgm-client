import { cn } from "fast-jsx/util";
import useSign from "@/hooks/useSign";

interface Props{
	howMuchChallenge?:number,
	point?:number,
	button: React.ReactNode,
	version?: "v1"|"v2"
}

export default function ChallengeStatus({howMuchChallenge, point, button, version="v1"}: Props){
	// 사용자 데이터 가져오기
	const { userData } = useSign();

	const v = version;
	const container = {
		display:'flex flex-col gap-y-[10px]',
		width:v==='v1'?'w-full':'w-[345px]',
		height:v==='v1'?'h-[100px]':'h-[95px]',
		radius:v==='v1'?'':'rounded-[10px]',
		padding:v==='v1'?'p-[24px]':'p-[20px]',
		background:'bg-light-main'
	}

	// 실제 데이터 또는 기본값 사용
	const actualCompletedCount = howMuchChallenge || 0;
	const actualPoints = userData?.point || point || 0;

	return <div className={cn(container)}>
		<div className="text-[12px] leading-none">
			지금 바로 챌린지에 참여하세요!
		</div>
		<div className="flex justify-between">
			<div className="text-[20px]">{actualPoints.toLocaleString()} P</div>
			<div>{button}</div>
		</div>
	</div>
}