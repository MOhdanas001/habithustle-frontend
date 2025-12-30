"use client";
import { useState } from "react";

export type Participant = { id: string; email?: string; name?: string; username?: string };
export type Verifier = { id: string; email?: string; name?: string; username?: string };
export type CreateBetForm = {
  name: string;
  description: string;
  amount: string;
  proofDescription: string;
  verifier: Verifier | null;
  verifierId: string | null;
  participantIds: string[];
  taskDays: string[];
  allowedOffDays: string; 
  startDate: string; 
  endDate: string; 
};

export function useCreateBetForm(initial?: Partial<CreateBetForm>) {
  const [step, setStep] = useState<number>(1);
  const [formData, setFormData] = useState<CreateBetForm>({
    name: "",
    description: "",
    amount: "",
    proofDescription: "",
    verifier: null,
    verifierId: null,
    participantIds: [],
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
    console.log("Input change:", e.target.name, e.target.value);
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

  const addParticipant = (friend?: { id: string; email?: string; name?: string; username?: string }) => {
    if (friend && friend.id) {
      setFormData((prev) => ({
        ...prev,
        participantIds: [...prev.participantIds, friend.id],
      }));
      return;
    }

    if (newParticipant.trim()) {
      const id = newParticipant.trim();
      setFormData((prev) => ({
        ...prev,
        participants: [...prev.participants, { id, email: newParticipant.trim() }],
        participantIds: [...prev.participantIds, id],
      }));
      setNewParticipant("");
    }
  };

  const removeParticipant = (id: string) => {
    setFormData((prev) => {
      return {
        ...prev,
        participantIds: prev.participantIds.filter((participantId) => participantId !== id),
      };
    });
  };

  const addVerifier = (friend: { id: string; email?: string; name?: string; username?: string }) => {
    setFormData((prev) => ({
      ...prev,
      verifier: { id: friend.id, email: friend.email, name: friend.name, username: friend.username },
      verifierId: friend.id,
    }));
  };

  const removeVerifier = () => {
    setFormData((prev) => ({
      ...prev,
      verifier: null,
      verifierId: null,
    }));
  };


  const submit = async () => {
    setLoading(true);
    setError(null);
    setSuccess(false);
    try {
      console.log("Submitting form data:", formData);
      // shape payload for backend
      const payload = {
        name: formData.name,
        description: formData.description,
        amount: Number(formData.amount || 0),
        proofDescription: formData.proofDescription,
        participantIds: formData.participantIds,
        verifierId: formData.verifierId,
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
    addVerifier,
    removeVerifier,
    submit,
  };
}
