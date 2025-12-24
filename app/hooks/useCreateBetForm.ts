"use client";
import { useState } from "react";

export type Participant = { email: string };
export type CreateBetForm = {
  name: string;
  description: string;
  amount: string; // kept as string for input control
  proofDescription: string;
  participants: Participant[];
  taskDays: string[];
  allowedOffDays: string; // kept as string for input control
  startDate: string; // yyyy-mm-dd from <input type="date">
  endDate: string; // yyyy-mm-dd
};

export function useCreateBetForm(initial?: Partial<CreateBetForm>) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CreateBetForm>({
    name: "",
    description: "",
    amount: "",
    proofDescription: "",
    participants: [],
    taskDays: [],
    allowedOffDays: "",
    startDate: "",
    endDate: "",
    ...(initial || {}),
  });
  const [newParticipant, setNewParticipant] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleDayToggle = (day: string) => {
    setFormData((prev) => ({
      ...prev,
      taskDays: prev.taskDays.includes(day)
        ? prev.taskDays.filter((d) => d !== day)
        : [...prev.taskDays, day],
    }));
  };

  const addParticipant = () => {
    if (newParticipant.trim()) {
      setFormData((prev) => ({
        ...prev,
        participants: [...prev.participants, { email: newParticipant.trim() }],
      }));
      setNewParticipant("");
    }
  };

  const removeParticipant = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      participants: prev.participants.filter((_, i) => i !== index),
    }));
  };

  const submit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      // shape payload for backend
      const payload = {
        name: formData.name,
        description: formData.description,
        amount: Number(formData.amount || 0),
        proofDescription: formData.proofDescription,
        participants: formData.participants.map((p) => p.email),
        taskDays: formData.taskDays, // e.g., ["Monday", "Wednesday"]
        allowedOffDays: Number(formData.allowedOffDays || 0),
        startDate: formData.startDate ? new Date(formData.startDate).toISOString() : null,
        endDate: formData.endDate ? new Date(formData.endDate).toISOString() : null,
      };

      const res = await fetch("/api/bet/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) {
        const text = await res.text();
        throw new Error(text || `Failed to create bet (${res.status})`);
      }

      setSuccess(true);
      return await res.json().catch(() => ({}));
    } catch (e: any) {
      setError(e?.message || "Unknown error");
      throw e;
    } finally {
      setLoading(false);
    }
  };

  return {
    step,
    setStep,
    formData,
    setFormData,
    newParticipant,
    setNewParticipant,
    loading,
    error,
    success,
    handleInputChange,
    handleDayToggle,
    addParticipant,
    removeParticipant,
    submit,
  };
}
