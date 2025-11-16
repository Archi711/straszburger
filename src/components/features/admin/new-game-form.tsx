import { useForm } from "@tanstack/react-form";
import { useMutation } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import z from "zod";
import { Button } from "@/components/ui/button";
import {
	Card,
	CardContent,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import {
	Field,
	FieldDescription,
	FieldError,
	FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { questionsJSON } from "@/db/schemas";
import { orpc } from "@/orpc/client";

export const NewGameForm = () => {
	const navigate = useNavigate();
	const { mutateAsync, isPending } = useMutation(
		orpc.game.create.mutationOptions({
			onSuccess: (id) => {
				form.reset();
				toast.success("Gra stworzona", {
					duration: Infinity,
					action: {
						label: "Przejdź do gry",
						onClick: () => {
							navigate(`/admin/${id}`);
						},
					},
				});
			},
		}),
	);
	const form = useForm({
		defaultValues: {
			pass: "",
			questions: "",
		},
		async onSubmit(props) {
			await mutateAsync({
				pass: props.value.pass,
				questions: questionsJSON.decode(props.value.questions),
			});
		},
	});
	return (
		<Card>
			<CardHeader>
				<CardTitle>Nowa gra</CardTitle>
			</CardHeader>
			<form
				className="contents"
				onSubmit={(e) => {
					e.preventDefault();
					form.handleSubmit();
				}}
			>
				<CardContent className="space-y-4">
					<form.Field
						name="pass"
						validators={{
							onBlur: z.string().min(4),
						}}
						children={(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Hasło</FieldLabel>
								<Input
									type="password"
									name={field.name}
									value={field.state.value}
									onChange={(e) => field.handleChange(e.target.value)}
									onBlur={field.handleBlur}
									minLength={4}
								/>
								<FieldDescription>
									Hasło do dostępu adminstracyjnego, dostęp display'u jest po ID
									gry.
								</FieldDescription>
							</Field>
						)}
					/>
					<form.Field
						name="questions"
						validators={{
							onChangeAsyncDebounceMs: 150,
							onChangeAsync: ({ value }) => {
								return questionsJSON.safeDecode(value).success
									? undefined
									: "Popraw pytania";
							},
						}}
						children={(field) => (
							<Field>
								<FieldLabel htmlFor={field.name}>Pytania</FieldLabel>
								<Textarea
									onChange={(e) => field.handleChange(e.target.value)}
									name={field.name}
								></Textarea>
								<FieldError>
									{!field.state.meta.isValid && "Popraw pytania"}
								</FieldError>
							</Field>
						)}
					/>
				</CardContent>
				<CardFooter>
					<Button disabled={!form.state.canSubmit} type="submit">
						{form.state.isSubmitting ? (
							<Loader2 className="animate-spin" />
						) : (
							"Stwórz grę"
						)}
					</Button>
				</CardFooter>
			</form>
		</Card>
	);
};
