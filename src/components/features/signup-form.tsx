import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Combobox } from "@/components/features/combobox";
export function SignupForm({
  onSubmit,
  ...props
}: React.ComponentProps<typeof Card> & {
  onSubmit?: (e: React.FormEvent) => void;
}) {
  return (
    <Card {...props}>
      <CardHeader>
        <CardTitle>Tạo tài khoản</CardTitle>
        <CardDescription>
          Nhập thông tin của bạn bên dưới để tạo tài khoản
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={onSubmit}>
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">Họ và tên</FieldLabel>
              <Input id="name" type="text" placeholder="" required />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">Email</FieldLabel>
              <Input id="email" type="email" placeholder="" required />
              <FieldDescription>
                Chúng tôi sẽ sử dụng email này để liên hệ với bạn. Chúng tôi sẽ
                không chia sẻ email của bạn với bất kỳ ai khác.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="password">Mật khẩu</FieldLabel>
              <Input id="password" type="password" required />
              <FieldDescription>
                Phải có ít nhất 8 ký tự, bao gồm chữ hoa, chữ thường, số và ký
                tự đặc biệt.
              </FieldDescription>
            </Field>
            <Field>
              <FieldLabel htmlFor="confirm-password">
                Xác nhận mật khẩu
              </FieldLabel>
              <Input id="confirm-password" type="password" required />
              <FieldDescription>
                Vui lòng xác nhận mật khẩu của bạn.
              </FieldDescription>
            </Field>
            <FieldGroup>
              <Field>
                <Button type="submit">Tạo tài khoản</Button>
                <FieldDescription className="px-6 text-center">
                  Bạn đã có tài khoản? <a href="/login">Đăng nhập</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
