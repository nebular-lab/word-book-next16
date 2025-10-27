"use client";

import { useForm } from "@conform-to/react/future";
import Form from "next/form";
import { useActionState } from "react";
import type z from "zod";
import { updateWordSchema } from "@/api/word-schema";
import { updateWord } from "@/api/words";
import { Button } from "@/components/shadcn/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/shadcn/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldSet,
} from "@/components/shadcn/field";
import { Input } from "@/components/shadcn/input";
import { Spinner } from "@/components/shadcn/spinner";

export function EditWordForm({
  wordId,
  defaultValue,
}: {
  wordId: string;
  defaultValue: z.infer<typeof updateWordSchema>;
}) {
  const [lastResult, action, isPending] = useActionState(updateWord, null);
  const { form, fields } = useForm({
    lastResult,
    shouldRevalidate: "onInput",
    defaultValue,
    schema: updateWordSchema,
  });

  const textFields = [
    { field: fields.title, label: "英語" },
    { field: fields.description, label: "日本語" },
    { field: fields.author, label: "作成者" },
  ];

  return (
    <Form {...form.props} action={action}>
      <Card>
        <input type="hidden" name="id" value={wordId} />
        <CardHeader>
          <CardTitle>編集</CardTitle>
        </CardHeader>
        <CardContent>
          <FieldSet>
            <FieldGroup>
              {textFields.map(({ field, label }) => (
                <Field key={field.name}>
                  <FieldLabel htmlFor={field.id}>{label}</FieldLabel>
                  <Input
                    id={field.id}
                    name={field.name}
                    defaultValue={field.defaultValue}
                  />
                  <FieldError>{field.errors?.at(0)}</FieldError>
                </Field>
              ))}
            </FieldGroup>
          </FieldSet>
        </CardContent>
        <CardFooter className="justify-end gap-2">
          <Button type="submit" disabled={isPending}>
            {isPending ? <Spinner /> : "更新"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
