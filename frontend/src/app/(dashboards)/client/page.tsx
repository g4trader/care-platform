"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api-client";
import { Star } from "lucide-react";

interface ClientRequest {
  id: string;
  careType: string;
  schedule: { startDate: string; timeSlots: string[] };
  location: { city: string; state: string; address: string };
  details: string;
  status: string;
  interestedCaregivers: string[];
}

interface Caregiver {
  id: string;
  bio: string;
  careTypes: string[];
  location: { city: string; state: string };
  priceRange: { min: number; max: number };
  rating: number;
}

export default function ClientDashboard() {
  const { userId, role, name, isAuthenticated, logout } = useAuth();
  const router = useRouter();
  const [requests, setRequests] = useState<ClientRequest[]>([]);
  const [caregivers, setCaregivers] = useState<Caregiver[]>([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    careType: "",
    startDate: "",
    timeSlots: "",
    address: "",
    city: "",
    state: "",
    details: "",
  });
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!isAuthenticated || role !== "client") {
      router.push("/login");
      return;
    }

    loadData();
  }, [userId, isAuthenticated, role, router]);

  const loadData = async () => {
    try {
      const requestsData = await apiClient.get<ClientRequest[]>(
        `/api/client-requests?clientId=${userId}`,
        userId
      );
      setRequests(requestsData);

      const caregiversData = await apiClient.get<Caregiver[]>("/api/caregivers", userId);
      setCaregivers(caregiversData.slice(0, 3));
    } catch (err) {
      console.error("Erro ao carregar dados:", err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      await apiClient.post(
        "/api/client-requests",
        {
          careType: formData.careType,
          schedule: {
            startDate: formData.startDate,
            timeSlots: formData.timeSlots.split(",").map((s) => s.trim()),
          },
          location: {
            address: formData.address,
            city: formData.city,
            state: formData.state,
          },
          details: formData.details,
        },
        userId
      );

      setFormData({
        careType: "",
        startDate: "",
        timeSlots: "",
        address: "",
        city: "",
        state: "",
        details: "",
      });
      setShowForm(false);
      loadData();
    } catch (err: any) {
      alert(err.message || "Erro ao criar pedido");
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="cp-page">
        <div className="cp-container">
          <div className="cp-card" style={{ textAlign: "center", padding: "var(--spacing-3xl)" }}>
            <p>Carregando...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="cp-page">
      <div className="cp-container">
        {/* Header */}
        <div className="cp-page-header" style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
          <div>
            <h1>Painel do contratante</h1>
            <p>Crie pedidos de cuidado e acompanhe quem está atendendo sua família.</p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-md)" }}>
            <div className="cp-user-pill">
              <span>{name || "Usuário"}</span>
              <span className="cp-user-pill-role">Contratante</span>
            </div>
            <button className="cp-btn cp-btn-ghost" onClick={logout} style={{ padding: "var(--spacing-sm) var(--spacing-md)" }}>
              Sair
            </button>
          </div>
        </div>

        {/* Meus Pedidos */}
        <div className="cp-card" style={{ marginBottom: "var(--spacing-xl)" }}>
          <div className="cp-card-header" style={{ justifyContent: "space-between" }}>
            <div>
              <h3 className="cp-card-title">Meus pedidos de cuidado</h3>
              <p className="cp-card-subtitle">{requests.length} pedido(s) criado(s)</p>
            </div>
            <button
              className="cp-btn cp-btn-primary"
              onClick={() => setShowForm(!showForm)}
              style={{ padding: "var(--spacing-sm) var(--spacing-lg)" }}
            >
              {showForm ? "Cancelar" : "+ Criar novo pedido"}
            </button>
          </div>

          {showForm && (
            <form onSubmit={handleSubmit} style={{ marginTop: "var(--spacing-xl)", paddingTop: "var(--spacing-xl)", borderTop: "1px solid var(--color-gray-200)" }}>
              <div className="cp-grid-2" style={{ marginBottom: "var(--spacing-md)" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                    Tipo de cuidado *
                  </label>
                  <select
                    value={formData.careType}
                    onChange={(e) => setFormData({ ...formData, careType: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "var(--spacing-md)",
                      fontSize: "var(--font-size-base)",
                      border: "1px solid var(--color-gray-300)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  >
                    <option value="">Selecione...</option>
                    <option value="elderly">Idosos</option>
                    <option value="children">Crianças</option>
                    <option value="special_needs">Necessidades especiais</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                    Data de início *
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "var(--spacing-md)",
                      fontSize: "var(--font-size-base)",
                      border: "1px solid var(--color-gray-300)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "var(--spacing-md)" }}>
                <label style={{ display: "block", marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                  Horários (separados por vírgula) *
                </label>
                <input
                  type="text"
                  value={formData.timeSlots}
                  onChange={(e) => setFormData({ ...formData, timeSlots: e.target.value })}
                  placeholder="Ex: 08:00-12:00, 14:00-18:00"
                  required
                  style={{
                    width: "100%",
                    padding: "var(--spacing-md)",
                    fontSize: "var(--font-size-base)",
                    border: "1px solid var(--color-gray-300)",
                    borderRadius: "var(--radius-lg)",
                  }}
                />
              </div>

              <div style={{ marginBottom: "var(--spacing-md)" }}>
                <label style={{ display: "block", marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                  Endereço *
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  required
                  style={{
                    width: "100%",
                    padding: "var(--spacing-md)",
                    fontSize: "var(--font-size-base)",
                    border: "1px solid var(--color-gray-300)",
                    borderRadius: "var(--radius-lg)",
                  }}
                />
              </div>

              <div className="cp-grid-2" style={{ marginBottom: "var(--spacing-md)" }}>
                <div>
                  <label style={{ display: "block", marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                    Cidade *
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "var(--spacing-md)",
                      fontSize: "var(--font-size-base)",
                      border: "1px solid var(--color-gray-300)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: "block", marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                    Estado *
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    required
                    style={{
                      width: "100%",
                      padding: "var(--spacing-md)",
                      fontSize: "var(--font-size-base)",
                      border: "1px solid var(--color-gray-300)",
                      borderRadius: "var(--radius-lg)",
                    }}
                  />
                </div>
              </div>

              <div style={{ marginBottom: "var(--spacing-lg)" }}>
                <label style={{ display: "block", marginBottom: "var(--spacing-sm)", fontSize: "var(--font-size-sm)", fontWeight: 500 }}>
                  Detalhes e observações *
                </label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows={4}
                  required
                  style={{
                    width: "100%",
                    padding: "var(--spacing-md)",
                    fontSize: "var(--font-size-base)",
                    border: "1px solid var(--color-gray-300)",
                    borderRadius: "var(--radius-lg)",
                    fontFamily: "inherit",
                  }}
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="cp-btn cp-btn-primary"
                style={{ width: "100%" }}
              >
                {submitting ? "Criando..." : "Criar Pedido"}
              </button>
            </form>
          )}

          {requests.length === 0 ? (
            <p style={{ color: "var(--color-gray-500)", textAlign: "center", padding: "var(--spacing-xl)" }}>
              Você ainda não criou nenhum pedido de cuidado.
            </p>
          ) : (
            <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", marginTop: "var(--spacing-lg)" }}>
              {requests.map((request) => (
                <div
                  key={request.id}
                  style={{
                    padding: "var(--spacing-lg)",
                    border: "1px solid var(--color-gray-200)",
                    borderRadius: "var(--radius-lg)",
                    backgroundColor: "var(--color-gray-50)",
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--spacing-sm)" }}>
                    <div>
                      <strong>
                        {request.careType === "elderly" && "Cuidado de Idosos"}
                        {request.careType === "children" && "Cuidado de Crianças"}
                        {request.careType === "special_needs" && "Cuidado Especializado"}
                      </strong>
                      <span
                        className="feature-tag"
                        style={{
                          marginLeft: "var(--spacing-sm)",
                          backgroundColor: request.status === "open" ? "var(--color-primary)" : "var(--color-gray-400)",
                          color: "white",
                        }}
                      >
                        {request.status}
                      </span>
                    </div>
                  </div>
                  <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-600)", marginBottom: "var(--spacing-xs)" }}>
                    <strong>Local:</strong> {request.location.address}, {request.location.city}, {request.location.state}
                  </p>
                  <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-600)", marginBottom: "var(--spacing-xs)" }}>
                    <strong>Horários:</strong> {request.schedule.timeSlots.join(", ")}
                  </p>
                  <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-700)", marginBottom: "var(--spacing-sm)" }}>
                    {request.details}
                  </p>
                  <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-600)" }}>
                    <strong>Interessados:</strong> {request.interestedCaregivers.length} cuidador(es)
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Cuidadores Recomendados */}
        <div className="cp-card">
          <div className="cp-card-header" style={{ justifyContent: "space-between" }}>
            <div>
              <h3 className="cp-card-title">Cuidadores recomendados</h3>
              <p className="cp-card-subtitle">{caregivers.length} cuidador(es) disponível(eis)</p>
            </div>
            <button
              className="cp-btn cp-btn-secondary"
              onClick={() => router.push("/caregivers-list")}
              style={{ padding: "var(--spacing-sm) var(--spacing-lg)" }}
            >
              Ver todos
            </button>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-md)", marginTop: "var(--spacing-lg)" }}>
            {caregivers.length === 0 ? (
              <p style={{ color: "var(--color-gray-500)", textAlign: "center", padding: "var(--spacing-lg)" }}>
                Nenhum cuidador disponível no momento.
              </p>
            ) : (
              caregivers.map((caregiver) => (
                <div
                  key={caregiver.id}
                  style={{
                    padding: "var(--spacing-md)",
                    border: "1px solid var(--color-gray-200)",
                    borderRadius: "var(--radius-lg)",
                    cursor: "pointer",
                    transition: "all var(--transition-base)",
                  }}
                  onClick={() => router.push(`/caregivers/${caregiver.id}`)}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-primary)";
                    e.currentTarget.style.boxShadow = "var(--shadow-sm)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "var(--color-gray-200)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: "var(--spacing-xs)" }}>
                    <strong style={{ fontSize: "var(--font-size-base)" }}>Cuidador</strong>
                    <span style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-600)", display: "flex", alignItems: "center", gap: "0.25rem" }}>
                      {caregiver.rating.toFixed(1)}
                      <Star className="cp-icon-sm" style={{ width: "12px", height: "12px", color: "#f59e0b" }} />
                    </span>
                  </div>
                  <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-gray-600)", marginBottom: "var(--spacing-xs)" }}>
                    {caregiver.bio.substring(0, 80)}...
                  </p>
                  <div style={{ display: "flex", gap: "var(--spacing-sm)", fontSize: "var(--font-size-xs)", color: "var(--color-gray-500)" }}>
                    <span>{caregiver.location.city}, {caregiver.location.state}</span>
                    <span>•</span>
                    <span>R$ {caregiver.priceRange.min}-{caregiver.priceRange.max}/hora</span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
