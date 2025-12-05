"use client";

import { useState } from "react";
import { apiClient } from "@/lib/api-client";
import { useAuth } from "@/context/AuthContext";
import { User, MapPin, Wallet, AlertCircle } from "lucide-react";

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

  const careTypeLabels: Record<string, string> = {
    elderly: "Idosos",
    children: "Crianças",
    special_needs: "Necessidades especiais",
  };

  return (
    <main className="cp-page">
      <div className="cp-container">
        <div className="cp-onboard-wrapper">
          <h1 className="cp-title-xl">Complete seu perfil profissional</h1>
          <p className="cp-subtitle">
            Essas informações ajudam famílias e instituições a encontrarem o cuidador ideal.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="cp-onboard-card">
              {/* Seção: Informações Profissionais */}
              <section className="cp-onboard-section">
                <div className="cp-onboard-section-header">
                  <User className="cp-icon" />
                  <h2>Informações profissionais</h2>
                </div>

                <div className="cp-field-group">
                  <label htmlFor="bio" className="cp-label">
                    Bio <span className="cp-required">*</span>
                  </label>
                  <textarea
                    id="bio"
                    className="cp-input cp-textarea"
                    value={formData.bio}
                    onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                    rows={5}
                    placeholder="Conte um pouco sobre você, sua experiência e especialidades. Seja específico e autêntico."
                    required
                  />
                  <p className="cp-field-hint">Mínimo de 50 caracteres recomendado</p>
                </div>

                <div className="cp-field-group">
                  <label className="cp-label">
                    Tipos de cuidado <span className="cp-required">*</span>
                  </label>
                  <div className="cp-checkbox-row">
                    {["elderly", "children", "special_needs"].map((type) => (
                      <label key={type} className="cp-checkbox-label">
                        <input
                          type="checkbox"
                          checked={formData.careTypes.includes(type)}
                          onChange={() => handleCareTypeToggle(type)}
                          className="cp-checkbox"
                        />
                        <span className="cp-checkbox-text">{careTypeLabels[type]}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </section>

              {/* Seção: Localização */}
              <section className="cp-onboard-section">
                <div className="cp-onboard-section-header">
                  <MapPin className="cp-icon" />
                  <h2>Localização</h2>
                </div>

                <div className="cp-field-group">
                  <label htmlFor="city" className="cp-label">
                    Cidade <span className="cp-required">*</span>
                  </label>
                  <input
                    id="city"
                    type="text"
                    className="cp-input"
                    value={formData.location.city}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, city: e.target.value },
                      })
                    }
                    placeholder="São Paulo"
                    required
                  />
                </div>

                <div className="cp-field-group">
                  <label htmlFor="state" className="cp-label">
                    Estado
                  </label>
                  <input
                    id="state"
                    type="text"
                    className="cp-input"
                    value={formData.location.state}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        location: { ...formData.location, state: e.target.value },
                      })
                    }
                    placeholder="SP"
                    maxLength={2}
                  />
                </div>
              </section>

              {/* Seção: Faixa de Preço */}
              <section className="cp-onboard-section">
                <div className="cp-onboard-section-header">
                  <Wallet className="cp-icon" />
                  <h2>Faixa de Preço (R$/hora)</h2>
                </div>

                <div className="cp-field-group">
                  <label className="cp-label">
                    Valor por hora <span className="cp-required">*</span>
                  </label>
                  <div className="cp-field-row">
                    <div>
                      <input
                        type="number"
                        className="cp-input"
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
                        min="0"
                        required
                      />
                    </div>
                    <div>
                      <input
                        type="number"
                        className="cp-input"
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
                        min="0"
                        required
                      />
                    </div>
                  </div>
                  <p className="cp-field-hint">Defina uma faixa de preço competitiva para sua região</p>
                </div>
              </section>

              {/* Error Message */}
              {error && (
                <div className="cp-error-message">
                  <AlertCircle className="cp-icon-sm" style={{ width: "18px", height: "18px" }} />
                  <span>{error}</span>
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="cp-btn cp-btn-primary cp-btn-lg"
                style={{ width: "100%", marginTop: "var(--spacing-md)" }}
              >
                {loading ? "Salvando..." : "Salvar perfil"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </main>
  );
}
