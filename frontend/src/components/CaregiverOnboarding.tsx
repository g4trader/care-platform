"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";

interface OnboardingData {
  bio: string;
  careTypes: string[];
  location: { city: string; state: string };
  priceRange: { min: number; max: number; currency: string };
}

export default function CaregiverOnboarding({
  onComplete,
}: {
  onComplete: () => void;
}) {
  const { userId } = useAuth();
  const [formData, setFormData] = useState<OnboardingData>({
    bio: "",
    careTypes: [],
    location: { city: "", state: "" },
    priceRange: { min: 0, max: 0, currency: "BRL" },
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleCareTypeToggle = (type: string) => {
    setFormData((prev) => ({
      ...prev,
      careTypes: prev.careTypes.includes(type)
        ? prev.careTypes.filter((t) => t !== type)
        : [...prev.careTypes, type],
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!formData.bio || formData.careTypes.length === 0 || !formData.location.city) {
      setError("Preencha todos os campos obrigatórios");
      return;
    }

    setLoading(true);
    try {
      await apiClient.post("/api/caregivers", formData, userId);
      onComplete();
    } catch (err: any) {
      setError(err.message || "Erro ao salvar perfil");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: "600px" }}>
      <h2 style={{ marginBottom: "1.5rem" }}>Complete seu perfil</h2>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Bio *
        </label>
        <textarea
          value={formData.bio}
          onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
          rows={4}
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="Conte um pouco sobre você e sua experiência..."
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Tipos de cuidado *
        </label>
        {["elderly", "children", "special_needs"].map((type) => (
          <label key={type} style={{ display: "block", marginBottom: "0.5rem" }}>
            <input
              type="checkbox"
              checked={formData.careTypes.includes(type)}
              onChange={() => handleCareTypeToggle(type)}
              style={{ marginRight: "0.5rem" }}
            />
            {type === "elderly" && "Idosos"}
            {type === "children" && "Crianças"}
            {type === "special_needs" && "Necessidades especiais"}
          </label>
        ))}
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Cidade *
        </label>
        <input
          type="text"
          value={formData.location.city}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: { ...formData.location, city: e.target.value },
            })
          }
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="São Paulo"
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Estado
        </label>
        <input
          type="text"
          value={formData.location.state}
          onChange={(e) =>
            setFormData({
              ...formData,
              location: { ...formData.location, state: e.target.value },
            })
          }
          style={{
            width: "100%",
            padding: "0.5rem",
            fontSize: "1rem",
            border: "1px solid #ccc",
            borderRadius: "4px",
          }}
          placeholder="SP"
        />
      </div>

      <div style={{ marginBottom: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          Faixa de preço (R$/hora) *
        </label>
        <div style={{ display: "flex", gap: "1rem" }}>
          <input
            type="number"
            value={formData.priceRange.min || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                priceRange: {
                  ...formData.priceRange,
                  min: Number(e.target.value),
                },
              })
            }
            placeholder="Mínimo"
            style={{
              flex: 1,
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
          <input
            type="number"
            value={formData.priceRange.max || ""}
            onChange={(e) =>
              setFormData({
                ...formData,
                priceRange: {
                  ...formData.priceRange,
                  max: Number(e.target.value),
                },
              })
            }
            placeholder="Máximo"
            style={{
              flex: 1,
              padding: "0.5rem",
              fontSize: "1rem",
              border: "1px solid #ccc",
              borderRadius: "4px",
            }}
          />
        </div>
      </div>

      {error && <div style={{ color: "red", marginBottom: "1rem" }}>{error}</div>}

      <button
        type="submit"
        disabled={loading}
        style={{
          padding: "0.75rem 1.5rem",
          fontSize: "1rem",
          backgroundColor: "#0070f3",
          color: "white",
          border: "none",
          borderRadius: "4px",
          cursor: loading ? "not-allowed" : "pointer",
        }}
      >
        {loading ? "Salvando..." : "Salvar perfil"}
      </button>
    </form>
  );
}

