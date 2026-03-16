"use client";

import * as React from "react";
import { Accordion as BaseAccordion } from "@base-ui/react/accordion";
import { AnimatePresence, motion, type Transition } from "motion/react";
import { ChevronDownIcon } from "lucide-react";

import { getStrictContext } from "./lib/get-strict-context";
import { useControlledState } from "./hooks/use-controlled-state";
import { cn } from "@/client/lib/utils";

// --- Internal Primitive Logic ---

interface AccordionContextValue {
	value: string[] | undefined;
	setValue: (value: string[]) => void;
}

const [AccordionProvider, useAccordion] = getStrictContext<AccordionContextValue>("AccordionContext");

interface AccordionItemContextValue {
	isOpen: boolean;
	setIsOpen: (isOpen: boolean) => void;
}

const [AccordionItemProvider, useAccordionItem] = getStrictContext<AccordionItemContextValue>(
	"AccordionItemContext",
);

function PrimitiveAccordion({ collapsible = false, ...props }: any) {
	const [value, setValue] = useControlledState({
		value: props?.value,
		defaultValue: props?.defaultValue,
		onChange: props?.onValueChange,
	});

	return (
		<AccordionProvider value={{ value, setValue }}>
			<BaseAccordion.Root
				data-slot="accordion"
				{...props}
				onValueChange={setValue}
			/>
		</AccordionProvider>
	);
}

function PrimitiveAccordionItem(props: any) {
	const { value } = useAccordion();
	const [isOpen, setIsOpen] = React.useState(
		value?.includes(props?.value) ?? false,
	);

	React.useEffect(() => {
		setIsOpen(value?.includes(props?.value) ?? false);
	}, [value, props?.value]);

	return (
		<AccordionItemProvider value={{ isOpen, setIsOpen }}>
			<BaseAccordion.Item data-slot="accordion-item" {...props} />
		</AccordionItemProvider>
	);
}

function PrimitiveAccordionHeader(props: any) {
	return <BaseAccordion.Header data-slot="accordion-header" {...props} />;
}

function PrimitiveAccordionTrigger(props: any) {
	return <BaseAccordion.Trigger data-slot="accordion-trigger" {...props} />;
}

interface PrimitiveAccordionPanelProps extends React.HTMLAttributes<HTMLDivElement> {
	transition?: Transition;
	hiddenUntilFound?: boolean;
	keepRendered?: boolean;
}

function PrimitiveAccordionPanel({
	transition = { duration: 0.35, ease: "easeInOut" },
	hiddenUntilFound,
	keepRendered = false,
	...props
}: PrimitiveAccordionPanelProps) {
	const { isOpen } = useAccordionItem();

	return (
		<AnimatePresence>
			{keepRendered ? (
				<BaseAccordion.Panel
					hidden={false}
					hiddenUntilFound={hiddenUntilFound}
					keepMounted
					render={
						<motion.div
							key="accordion-panel"
							data-slot="accordion-panel"
							initial={{ height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }}
							animate={
								isOpen
									? { height: "auto", opacity: 1, "--mask-stop": "100%", y: 0 }
									: { height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }
							}
							transition={transition}
							style={{
								maskImage:
									"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
								WebkitMaskImage:
									"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
								overflow: "hidden",
							} as any}
							{...props}
						/>
					}
				/>
			) : (
				isOpen && (
					<BaseAccordion.Panel
						hidden={false}
						hiddenUntilFound={hiddenUntilFound}
						keepMounted
						render={
							<motion.div
								key="accordion-panel"
								data-slot="accordion-panel"
								initial={{ height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }}
								animate={{
									height: "auto",
									opacity: 1,
									"--mask-stop": "100%",
									y: 0,
								}}
								exit={{ height: 0, opacity: 0, "--mask-stop": "0%", y: 20 }}
								transition={transition}
								style={{
									maskImage:
										"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
									WebkitMaskImage:
										"linear-gradient(black var(--mask-stop), transparent var(--mask-stop))",
									overflow: "hidden",
								} as any}
								{...props}
							/>
						}
					/>
				)
			)}
		</AnimatePresence>
	);
}

// --- User-Facing Components ---

export interface AccordionProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Root> {
	collapsible?: boolean;
	type?: "single" | "multiple";
	value?: string | string[];
	onValueChange?: (value: any) => void;
}

function Accordion({ collapsible = false, ...props }: AccordionProps) {
	return <PrimitiveAccordion collapsible={collapsible} {...props} />;
}

export interface AccordionItemProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Item> {
	className?: string;
}

function AccordionItem({ className = "", ...props }: AccordionItemProps) {
	return (
		<PrimitiveAccordionItem
			className={cn("border-b last:border-b-0", className)}
			{...props}
		/>
	);
}

export interface AccordionTriggerProps extends React.ComponentPropsWithoutRef<typeof BaseAccordion.Trigger> {
	className?: string;
	children?: React.ReactNode;
	showArrow?: boolean;
}

function AccordionTrigger({
	className = "",
	children = null,
	showArrow = true,
	...props
}: AccordionTriggerProps) {
	return (
		<PrimitiveAccordionHeader className="flex">
			<PrimitiveAccordionTrigger
				className={cn(
					"focus-visible:border-ring focus-visible:ring-ring/50 flex flex-1 items-start justify-between gap-4 rounded-md py-4 text-left text-sm font-medium transition-all outline-none hover:underline focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&[data-panel-open]>svg]:rotate-180 [&[data-state=open]>svg]:rotate-180",
					className,
				)}
				{...props}
			>
				{children}
				{showArrow && (
					<ChevronDownIcon className="text-muted-foreground pointer-events-none size-4 shrink-0 translate-y-0.5 transition-transform duration-200" />
				)}
			</PrimitiveAccordionTrigger>
		</PrimitiveAccordionHeader>
	);
}

export interface AccordionPanelProps extends PrimitiveAccordionPanelProps {
	className?: string;
	children?: React.ReactNode;
}

function AccordionPanel({ className = "", children = null, ...props }: AccordionPanelProps) {
	return (
		<PrimitiveAccordionPanel {...props}>
			<div className={cn("text-sm pt-0 pb-4", className)}>{children}</div>
		</PrimitiveAccordionPanel>
	);
}

// Aliases for backward compatibility
const AccordionContent = AccordionPanel;


Accordion.displayName = "Accordion";
AccordionItem.displayName = "AccordionItem";
AccordionTrigger.displayName = "AccordionTrigger";
AccordionPanel.displayName = "AccordionPanel";
AccordionContent.displayName = "AccordionContent";

export {
	Accordion,
	AccordionItem,
	AccordionTrigger,
	AccordionPanel,
	AccordionContent,
	useAccordionItem,
};

