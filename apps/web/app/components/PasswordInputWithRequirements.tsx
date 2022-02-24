import { useState, ReactElement } from "react";
import { PasswordInput, Progress, Popover, Text } from "@mantine/core";
import { XIcon, CheckIcon, EyeIcon, EyeOffIcon } from "@heroicons/react/solid";

const requirements = [
  { re: /[0-9]/, label: "Includes number" },
  { re: /[a-z]/, label: "Includes lowercase letter" },
  { re: /[A-Z]/, label: "Includes uppercase letter" },
  { re: /[$&+,:;=?@#|'<>.^*()%!-]/, label: "Includes special symbol" },
];

const getStrength = (password: string) => {
  let multiplier = password.length > 7 ? 0 : 1;

  requirements.forEach((requirement) => {
    if (!requirement.re.test(password)) {
      multiplier += 1;
    }
  });

  return Math.max(100 - (100 / (requirements.length + 1)) * multiplier, 10);
};

const PasswordRequirement = ({
  meets,
  label,
}: {
  meets: boolean;
  label: string;
}): ReactElement => {
  return (
    <Text
      color={meets ? "teal" : "red"}
      style={{ display: "flex", alignItems: "center", marginTop: 7 }}
      size="sm"
    >
      {meets ? (
        <CheckIcon style={{ width: 20 }} />
      ) : (
        <XIcon style={{ width: 20 }} />
      )}{" "}
      <span style={{ marginLeft: 10 }}>{label}</span>
    </Text>
  );
};

const PasswordInputWithRequirements = ({ ...props }): ReactElement => {
  const [popoverOpened, setPopoverOpened] = useState(false);
  const checks = requirements.map((requirement, index) => (
    <PasswordRequirement
      key={index}
      label={requirement.label}
      meets={requirement.re.test(props.value)}
    />
  ));

  const strength = getStrength(props.value);
  const color = strength === 100 ? "teal" : strength > 50 ? "yellow" : "red";

  return (
    <Popover
      opened={popoverOpened}
      position="bottom"
      placement="start"
      withArrow
      styles={{ popover: { width: "100%" } }}
      noFocusTrap
      transition="pop-top-left"
      onFocusCapture={() => setPopoverOpened(true)}
      onBlurCapture={() => setPopoverOpened(false)}
      target={
        <PasswordInput
          {...props}
          visibilityToggleIcon={({ reveal }) =>
            reveal ? (
              <EyeOffIcon style={{ width: 15 }} />
            ) : (
              <EyeIcon style={{ width: 15 }} />
            )
          }
        />
      }
    >
      <Progress
        color={color}
        value={strength}
        size={5}
        style={{ marginBottom: 10 }}
      />
      <PasswordRequirement
        label="Includes at least 8 characters"
        meets={props.value.length > 7}
      />
      {checks}
    </Popover>
  );
};
export default PasswordInputWithRequirements;
