"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { apiClient } from "@/lib/api-client";
import { DashboardShell } from "@/components/layout/DashboardShell";
import { FilePlus, ClipboardList, Star, MapPin, Wallet, Activity, Calendar, Users } from "lucide-react";

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
  const { userId, role, isAuthenticated } = useAuth();
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

  const activeRequests = requests.filter((r) => r.status === "open").length;
  const caregiversInService = requests.reduce((acc, r) => acc + r.interestedCaregivers.length, 0);
  const nextRequest = requests.find((r) => r.status === "open");

  if (loading) {
    return (
      <DashboardShell title="Painel do contratante" roleLabel="CONTRATANTE">
        <div className="cp-card" style={{ textAlign: "center", padding: "var(--spacing-3xl)" }}>
          <p>Carregando...</p>
        </div>
      </DashboardShell>
    );
  }

  return (
    <DashboardShell
      title="Painel do contratante"
      subtitle="Crie pedidos de cuidado e acompanhe quem está atendendo sua família."
      roleLabel="CONTRATANTE"
    >
      {/* CAMADA 1 - Resumo Rápido */}
      <div className="cp-metrics-summary">
        <div className="cp-metric-summary-card">
          <div className="cp-metric-summary-value">{activeRequests}</div>
          <p className="cp-metric-summary-label">Pedidos ativos</p>
        </div>
        <div className="cp-metric-summary-card">
          <div className="cp-metric-summary-value">{caregiversInService}</div>
          <p className="cp-metric-summary-label">Cuidadores em atendimento</p>
        </div>
        <div className="cp-metric-summary-card">
          <div className="cp-metric-summary-value">
            {nextRequest ? (
              <>
                <Calendar className="cp-icon-sm" style={{ width: "20px", height: "20px", display: "inline", marginRight: "0.25rem" }} />
                {new Date(nextRequest.schedule.startDate).toLocaleDateString("pt-BR", { day: "2-digit", month: "short" })}
              </>
            ) : (
              "—"
            )}
          </div>
          <p className="cp-metric-summary-label">Próximo atendimento</p>
        </div>
      </div>

      {/* CAMADA 2 - Cards Grandes */}
      <div className="cp-dashboard-grid">
        {/* Card 1: Meus Pedidos */}
        <div className="cp-card">
          <div className="cp-card-header">
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
                  <label className="cp-label">
                    Tipo de cuidado <span className="cp-required">*</span>
                  </label>
                  <select
                    value={formData.careType}
                    onChange={(e) => setFormData({ ...formData, careType: e.target.value })}
                    className="cp-input"
                    required
                  >
                    <option value="">Selecione...</option>
                    <option value="elderly">Idosos</option>
                    <option value="children">Crianças</option>
                    <option value="special_needs">Necessidades especiais</option>
                  </select>
                </div>
                <div>
                  <label className="cp-label">
                    Data de início <span className="cp-required">*</span>
                  </label>
                  <input
                    type="date"
                    value={formData.startDate}
                    onChange={(e) => setFormData({ ...formData, startDate: e.target.value })}
                    className="cp-input"
                    required
                  />
                </div>
              </div>

              <div className="cp-field-group">
                <label className="cp-label">
                  Horários (separados por vírgula) <span className="cp-required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.timeSlots}
                  onChange={(e) => setFormData({ ...formData, timeSlots: e.target.value })}
                  placeholder="Ex: 08:00-12:00, 14:00-18:00"
                  className="cp-input"
                  required
                />
              </div>

              <div className="cp-field-group">
                <label className="cp-label">
                  Endereço <span className="cp-required">*</span>
                </label>
                <input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  className="cp-input"
                  required
                />
              </div>

              <div className="cp-grid-2" style={{ marginBottom: "var(--spacing-md)" }}>
                <div>
                  <label className="cp-label">
                    Cidade <span className="cp-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="cp-input"
                    required
                  />
                </div>
                <div>
                  <label className="cp-label">
                    Estado <span className="cp-required">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                    className="cp-input"
                    required
                  />
                </div>
              </div>

              <div className="cp-field-group">
                <label className="cp-label">
                  Detalhes e observações <span className="cp-required">*</span>
                </label>
                <textarea
                  value={formData.details}
                  onChange={(e) => setFormData({ ...formData, details: e.target.value })}
                  rows={4}
                  className="cp-textarea"
                  required
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

          {!showForm && (
            <>
              {requests.length === 0 ? (
                <div className="cp-empty-state">
                  <ClipboardList className="cp-empty-state-icon cp-icon-lg" style={{ width: "48px", height: "48px" }} />
                  <h4 className="cp-empty-state-title">Você ainda não criou nenhum pedido de cuidado.</h4>
                  <p className="cp-empty-state-text">
                    Crie seu primeiro pedido para começar a receber propostas de cuidadores qualificados.
                  </p>
                  <button
                    className="cp-btn cp-btn-secondary"
                    onClick={() => setShowForm(true)}
                    style={{ marginTop: "var(--spacing-md)" }}
                  >
                    Criar primeiro pedido
                  </button>
                </div>
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
            </>
          )}
        </div>

        {/* Card 2: Cuidadores Recomendados */}
        <div className="cp-card">
          <div className="cp-card-header">
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

          {caregivers.length === 0 ? (
            <div className="cp-empty-state">
              <Users className="cp-empty-state-icon cp-icon-lg" style={{ width: "48px", height: "48px" }} />
              <h4 className="cp-empty-state-title">Nenhum cuidador disponível</h4>
              <p className="cp-empty-state-text">
                Não há cuidadores cadastrados no momento.
              </p>
            </div>
          ) : (
            <div className="cp-caregiver-list">
              {caregivers.map((caregiver) => (
                <div
                  key={caregiver.id}
                  className="cp-caregiver-item"
                  onClick={() => router.push(`/caregivers/${caregiver.id}`)}
                >
                  <div className="cp-caregiver-main">
                    <div className="cp-caregiver-name">Cuidador</div>
                    <p className="cp-caregiver-bio">{caregiver.bio.substring(0, 80)}...</p>
                    <div className="cp-caregiver-meta">
                      <span>
                        <MapPin className="cp-icon-sm" style={{ width: "14px", height: "14px", display: "inline", marginRight: "0.25rem" }} />
                        {caregiver.location.city}, {caregiver.location.state}
                      </span>
                      <span>•</span>
                      <span>
                        <Wallet className="cp-icon-sm" style={{ width: "14px", height: "14px", display: "inline", marginRight: "0.25rem" }} />
                        R$ {caregiver.priceRange.min}-{caregiver.priceRange.max}/hora
                      </span>
                    </div>
                  </div>
                  <div className="cp-caregiver-rating">
                    <Star className="cp-icon-sm" style={{ width: "16px", height: "16px", fill: "#f59e0b", color: "#f59e0b" }} />
                    {caregiver.rating.toFixed(1)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </DashboardShell>
  );
}
