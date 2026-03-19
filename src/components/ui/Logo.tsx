import { useTheme } from "next-themes";
import logoLight from "@/assets/aura-logo-light.svg";
import logoDark from "@/assets/aura-logo-dark.svg";

export default function Logo() {
	const { resolvedTheme } = useTheme();

	return (
		<img
			src={resolvedTheme === "dark" ? logoDark : logoLight}
			alt="Aura"
			className="h-8 w-auto"
		/>
	);
}
