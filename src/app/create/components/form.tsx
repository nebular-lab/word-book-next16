"use client";

import { useForm } from "@conform-to/react/future";
import Form from "next/form";
import { useActionState } from "react";
import { toast } from "sonner";
import { createWordSchema } from "@/api/word-schema";
import { createWord } from "@/api/words"; // Point: サーバーアクション
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
import { withCallbacks } from "@/utils/withCallbacks";

export function CreateWordForm() {
  // Point: useActionStateを使うことで、サーバーアクションの状態を取得できる。
  //   lastResult サーバーアクションの戻り値。失敗時はエラー情報を返すようにしている。
  //   isPending サーバーアクションが実行中かどうか。
  const [lastResult, action, isPending] = useActionState(
    withCallbacks(createWord, {
      onSuccess: () => {
        toast.success("単語を作成しました");
      },
      onError: (SubmissionResult) => {
        console.log(SubmissionResult.error);
        // SubmissionResult.errorにはformErrorsとfieldErrorsが含まれる。
        // fieldErrorsは各項目ごとのエラーであり、これは項目の下に表示される。
        // formErrorsはフォーム全体のエラーであり、これはトーストで表示する。
        const firstFormError = SubmissionResult.error?.formErrors.at(0);
        if (firstFormError) toast.error(firstFormError);
      },
    }),
    null,
  );

  // Point: ConformライブラリのuseFormを使うことで、サーバーアクションのバリデーション結果を
  // フォームに反映することができる。
  // react-hook-formにはこのような機能はない。
  const { form, fields } = useForm({
    lastResult,
    shouldRevalidate: "onInput",
    // Point: クライアントでもバリデーションを行える。
    schema: createWordSchema,
  });

  const textFields = [
    { field: fields.title, label: "英語" },
    { field: fields.description, label: "日本語" },
    { field: fields.author, label: "作成者" },
  ];

  return (
    // actionを指定する
    <Form {...form.props} action={action}>
      <Card>
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
            {isPending ? <Spinner /> : "作成"}
          </Button>
        </CardFooter>
      </Card>
    </Form>
  );
}
