import os
from reportlab.lib.pagesizes import A4
from reportlab.lib import colors
from reportlab.platypus import (
    SimpleDocTemplate, Paragraph, Spacer, Table, TableStyle, PageBreak, KeepTogether, HRFlowable
)
from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle

def get_base_styles():
    styles = getSampleStyleSheet()
    
    PRIMARY = colors.HexColor('#27B29B')
    PRIMARY_DARK = colors.HexColor('#1F8F7C')
    PRIMARY_LIGHT = colors.HexColor('#E6F8F5')
    DARK = colors.HexColor('#0F172A')
    SLATE = colors.HexColor('#475569')
    LIGHT_BG = colors.HexColor('#F8FAFC')
    BORDER_COLOR = colors.HexColor('#E2E8F0')
    BLUE_ACCENT = colors.HexColor('#0284C7')
    BLUE_LIGHT = colors.HexColor('#F0F9FF')
    ORANGE_ACCENT = colors.HexColor('#EA580C')
    ORANGE_LIGHT = colors.HexColor('#FFF7ED')
    RED_ACCENT = colors.HexColor('#DC2626')
    RED_LIGHT = colors.HexColor('#FFF5F5')
    GREEN_ACCENT = colors.HexColor('#16A34A')
    GREEN_LIGHT = colors.HexColor('#F0FDF4')
    
    style_dict = {
        'doc_title': ParagraphStyle('DocTitle', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=16, leading=20, textColor=PRIMARY, spaceAfter=2),
        'meta': ParagraphStyle('DocMeta', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11.5, textColor=SLATE),
        'h1': ParagraphStyle('SectionH1', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=11, leading=15, textColor=DARK, spaceBefore=9, spaceAfter=3),
        'body': ParagraphStyle('BodyDark', parent=styles['Normal'], fontName='Helvetica', fontSize=8.5, leading=12.5, textColor=DARK, spaceAfter=3),
        'body_bold': ParagraphStyle('BodyDarkBold', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=12.5, textColor=DARK),
        'body_white': ParagraphStyle('BodyWhite', parent=styles['Normal'], fontName='Helvetica-Bold', fontSize=8.5, leading=12, textColor=colors.white),
        'callout': ParagraphStyle('CalloutText', parent=styles['Normal'], fontName='Helvetica', fontSize=8, leading=11.5, textColor=SLATE),
        'colors': {
            'PRIMARY': PRIMARY, 'PRIMARY_DARK': PRIMARY_DARK, 'PRIMARY_LIGHT': PRIMARY_LIGHT,
            'DARK': DARK, 'SLATE': SLATE, 'LIGHT_BG': LIGHT_BG, 'BORDER_COLOR': BORDER_COLOR,
            'BLUE_ACCENT': BLUE_ACCENT, 'BLUE_LIGHT': BLUE_LIGHT,
            'ORANGE_ACCENT': ORANGE_ACCENT, 'ORANGE_LIGHT': ORANGE_LIGHT,
            'RED_ACCENT': RED_ACCENT, 'RED_LIGHT': RED_LIGHT,
            'GREEN_ACCENT': GREEN_ACCENT, 'GREEN_LIGHT': GREEN_LIGHT
        }
    }
    return style_dict

# ==============================================================================
# PDF 1: SKENARIO 1 - TR DIRECT EXTENSION (FREE & CHARGEABLE)
# ==============================================================================
def create_pdf_scenario_1_tr_direct(output_path):
    st = get_base_styles()
    c = st['colors']
    doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=36, leftMargin=36, topMargin=34, bottomMargin=34)
    story = []

    # Header Box
    header_data = [
        [
            Paragraph("PROA PROPERTY MANAGEMENT SYSTEM", ParagraphStyle('HdrSub', fontName='Helvetica-Bold', fontSize=8, textColor=c['PRIMARY_DARK'], spaceAfter=2)),
            Paragraph("DOKUMEN SPESIFIKASI SKENARIO 1", ParagraphStyle('HdrRight', fontName='Helvetica-Bold', fontSize=8, textColor=c['SLATE'], alignment=2))
        ],
        [
            Paragraph("Skenario 1: Perpanjangan Langsung oleh Tenant Relation (TR Direct Extension)", st['doc_title']),
            ""
        ],
        [
            Paragraph("<b>Fokus:</b> Keputusan Mandiri TR Tanpa Pengajuan Engineering Lapangan<br/><b>Konteks:</b> Hasil Negosiasi Komersial / Kesepakatan Khusus dengan Tenant", st['meta']),
            Paragraph("<b>Target:</b> Project Manager & Dev Team<br/><b>Tanggal:</b> 16 Agustus 2026<br/><b>Dokumen:</b> PDF 1 dari 2", ParagraphStyle('HdrMetaR', fontName='Helvetica', fontSize=8, leading=11, textColor=c['SLATE'], alignment=2))
        ]
    ]
    header_table = Table(header_data, colWidths=[340, 180])
    header_table.setStyle(TableStyle([
        ('SPAN', (0, 1), (1, 1)),
        ('BACKGROUND', (0, 0), (-1, -1), c['LIGHT_BG']),
        ('BOX', (0, 0), (-1, -1), 1, c['BORDER_COLOR']),
        ('LINEBEFORE', (0, 0), (0, -1), 4, c['PRIMARY']),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # 1. Executive Summary
    story.append(Paragraph("1. Latar Belakang & Konteks Bisnis", st['h1']))
    story.append(Paragraph(
        "Skenario ini berlaku ketika Tenant Relation (TR) berinisiatif atau telah bersepakat langsung dengan pemilik/tenant untuk memperpanjang masa pengerjaan fitout unit, "
        "tanpa memerlukan permohonan teknis bertahap dari tim Engineering lapangan. TR membuka modal <b>Extension</b> langsung dari header permit.",
        st['body']
    ))

    # 2. Dua Pilihan Kebijakan TR (Free vs Chargeable)
    story.append(Paragraph("2. Dua Cabang Kebijakan Biaya (Extension Fee Policy)", st['h1']))
    
    branch_data = [
        [
            Paragraph("<b>CABANG A: GRATIS (FREE OF CHARGE)</b>", ParagraphStyle('Br1', fontName='Helvetica-Bold', fontSize=8.5, textColor=c['PRIMARY_DARK'])),
            Paragraph("<b>CABANG B: BERBAYAR (CHARGEABLE)</b>", ParagraphStyle('Br2', fontName='Helvetica-Bold', fontSize=8.5, textColor=c['BLUE_ACCENT']))
        ],
        [
            Paragraph(
                "• <b>Kondisi:</b> Diberikan sebagai toleransi manajemen (contoh: kompensasi keterlambatan supply material gedung, proses pengeringan semen).<br/>"
                "• <b>Aksi TR:</b> Memilih opsi <i>Free of Charge</i> + memilih alasan kebijakan.<br/>"
                "• <b>Dampak Biaya:</b> <b>Rp 0,00</b> (Bebas Biaya Supervisi).<br/>"
                "• <b>Status Permit:</b> Tetap <b>ON WORK</b> dan tanggal akhir langsung diperpanjang (contoh: menjadi <b>13 Aug 2026</b>).",
                st['body']
            ),
            Paragraph(
                "• <b>Kondisi:</b> Keterlambatan murni dari pihak kontraktor/tenant dan dikenakan biaya supervisi harian gedung.<br/>"
                "• <b>Aksi TR:</b> Memilih opsi <i>Chargeable</i> + memasukkan nominal tarif.<br/>"
                "• <b>Dampak Biaya:</b> Terbit invoice <b>Fitout Extension Bill</b>.<br/>"
                "• <b>Status Permit:</b> Berubah ke <b>WAITING PAYMENT</b> ➔ setelah tenant melunasi, status kembali ke <b>ON WORK</b> (tgl 13 Aug).",
                st['body']
            )
        ]
    ]
    branch_table = Table(branch_data, colWidths=[255, 255])
    branch_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (0, 0), c['PRIMARY_LIGHT']),
        ('BACKGROUND', (1, 0), (1, 0), c['BLUE_LIGHT']),
        ('BOX', (0, 0), (0, 1), 1, colors.HexColor('#99F6E4')),
        ('BOX', (1, 0), (1, 1), 1, colors.HexColor('#BAE6FD')),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 8),
        ('RIGHTPADDING', (0, 0), (-1, -1), 8),
    ]))
    story.append(branch_table)
    story.append(Spacer(1, 8))

    # 3. Spesifikasi Langkah demi Langkah (User Flow)
    story.append(Paragraph("3. Detail Alur Pengguna & Interaksi UI Form", st['h1']))
    
    flow_data = [
        [
            Paragraph("Langkah UI", st['body_white']),
            Paragraph("Tindakan Tenant Relation (TR)", st['body_white']),
            Paragraph("Validasi & Output Sistem", st['body_white'])
        ],
        [
            Paragraph("<b>1. Buka Modal</b>", st['body_bold']),
            Paragraph("Klik tombol <b>Extension</b> pada header permit unit.", st['body']),
            Paragraph("Modal terbuka dalam mode <i>Direct Extension</i> (Header: Fitout Extension Decision).", st['body'])
        ],
        [
            Paragraph("<b>2. Pilih Tanggal Baru</b>", st['body_bold']),
            Paragraph("Pilih tanggal di Date Picker (misal: 13 Aug 2026).", st['body']),
            Paragraph("Badge durasi otomatis terkalkulasi: <b>+3 Days Extended</b> (Total: 9 Days).", st['body'])
        ],
        [
            Paragraph("<b>3. Tentukan Biaya</b>", st['body_bold']),
            Paragraph("Pilih radio card: <b>Free of Charge</b> atau <b>Chargeable</b>.", st['body']),
            Paragraph("Jika Chargeable: input box nominal aktif dengan format Rupiah accounting (Rp 0,00).", st['body'])
        ],
        [
            Paragraph("<b>4. Notes & Submit</b>", st['body_bold']),
            Paragraph("Isi catatan opsional pada textarea <b>3. Notes</b> ➔ Klik <b>Submit</b>.", st['body']),
            Paragraph("Button Submit aktif (hijau). Jika field belum lengkap, button disabled abu-abu.", st['body'])
        ]
    ]
    flow_table = Table(flow_data, colWidths=[110, 205, 205])
    flow_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c['DARK']),
        ('BACKGROUND', (0, 1), (-1, 1), colors.white),
        ('BACKGROUND', (0, 2), (-1, 2), c['LIGHT_BG']),
        ('BACKGROUND', (0, 3), (-1, 3), colors.white),
        ('BACKGROUND', (0, 4), (-1, 4), c['LIGHT_BG']),
        ('GRID', (0, 0), (-1, -1), 0.5, c['BORDER_COLOR']),
        ('TOPPADDING', (0, 0), (-1, -1), 5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 5),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.append(flow_table)
    story.append(Spacer(1, 8))

    # 4. Sign-off Box
    sign_data = [
        [
            Paragraph(
                "<b>Ringkasan untuk Project Manager:</b><br/>"
                "Skenario 1 memberikan otonomi penuh bagi Tenant Relation untuk mengakomodasi kesepakatan komersial dengan tenant secara cepat tanpa friksi birokrasi lapangan. Tata kelola keuangan tetap terjamin melalui penerbitan invoice otomatis saat memilih skema berbayar.",
                st['callout']
            )
        ]
    ]
    sign_table = Table(sign_data, colWidths=[520])
    sign_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c['PRIMARY_LIGHT']),
        ('BOX', (0, 0), (-1, -1), 1, c['PRIMARY']),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(sign_table)

    doc.build(story)
    print(f"PDF Scenario 1 successfully generated at: {output_path}")


# ==============================================================================
# PDF 2: SKENARIO 2 - ENGINEERING REQUEST LIFECYCLE (APPROVE / REJECT & AUTO-FINAL)
# ==============================================================================
def create_pdf_scenario_2_eng_lifecycle(output_path):
    st = get_base_styles()
    c = st['colors']
    doc = SimpleDocTemplate(output_path, pagesize=A4, rightMargin=36, leftMargin=36, topMargin=34, bottomMargin=34)
    story = []

    # Header Box
    header_data = [
        [
            Paragraph("PROA PROPERTY MANAGEMENT SYSTEM", ParagraphStyle('HdrSub2', fontName='Helvetica-Bold', fontSize=8, textColor=c['PRIMARY_DARK'], spaceAfter=2)),
            Paragraph("DOKUMEN SPESIFIKASI SKENARIO 2", ParagraphStyle('HdrRight2', fontName='Helvetica-Bold', fontSize=8, textColor=c['SLATE'], alignment=2))
        ],
        [
            Paragraph("Skenario 2: Permohonan Engineering & Siklus Keputusan TR (Approval, Rejection & Auto-Complete)", st['doc_title']),
            ""
        ],
        [
            Paragraph("<b>Fokus:</b> Evaluasi Teknis Lapangan, Pemisahan Wewenang (SoD), & Proteksi Status Tiket<br/><b>Konteks:</b> Temuan Lapangan Akhir Masa Kerja (10 Aug 2026)", st['meta']),
            Paragraph("<b>Target:</b> Project Manager & Dev Team<br/><b>Tanggal:</b> 16 Agustus 2026<br/><b>Dokumen:</b> PDF 2 dari 2", ParagraphStyle('HdrMetaR2', fontName='Helvetica', fontSize=8, leading=11, textColor=c['SLATE'], alignment=2))
        ]
    ]
    header_table = Table(header_data, colWidths=[340, 180])
    header_table.setStyle(TableStyle([
        ('SPAN', (0, 1), (1, 1)),
        ('BACKGROUND', (0, 0), (-1, -1), c['LIGHT_BG']),
        ('BOX', (0, 0), (-1, -1), 1, c['BORDER_COLOR']),
        ('LINEBEFORE', (0, 0), (0, -1), 4, c['ORANGE_ACCENT']),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(header_table)
    story.append(Spacer(1, 8))

    # 1. Alur Pengajuan dari Engineering Lapangan
    story.append(Paragraph("1. Tahap Pengajuan oleh Engineering (Mobile App)", st['h1']))
    story.append(Paragraph(
        "Pada akhir masa jadwal pengerjaan unit (contoh: <b>10 Agustus 2026</b>), tim Engineering melakukan evaluasi fisik di unit. "
        "Jika pekerjaan belum tuntas, Engineering mengajukan permohonan melalui aplikasi mobile:",
        st['body']
    ))

    eng_input_data = [
        [
            Paragraph("<b>Item Input Pengajuan</b>", st['body_bold']),
            Paragraph("<b>Rincian Data yang Diisi oleh Engineering Lead</b>", st['body_bold']),
            Paragraph("<b>Perilaku Sistem</b>", st['body_bold'])
        ],
        [
            Paragraph("1. Estimasi Hari (+3D)", st['body']),
            Paragraph("Mengusulkan tanggal akhir baru (misal: 10 Aug ➔ 13 Aug 2026).", st['body']),
            Paragraph("Kalkulasi selisih hari pengerjaan fisik.", st['body'])
        ],
        [
            Paragraph("2. Foto Dokumentasi", st['body']),
            Paragraph("Mengunggah 1-3 foto bukti kendala teknis (cth: sambungan pipa / instalasi).", st['body']),
            Paragraph("Tersimpan dan dapat di-zoom oleh TR.", st['body'])
        ],
        [
            Paragraph("3. Catatan Teknis (Notes)", st['body']),
            Paragraph("Alasan teknis: <i>'Kendala uji hidrolik pipa induk butuh perbaikan tambahan.'</i>", st['body']),
            Paragraph("Masuk ke antrean review dashboard TR.", st['body'])
        ]
    ]
    eng_input_table = Table(eng_input_data, colWidths=[120, 220, 180])
    eng_input_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c['ORANGE_LIGHT']),
        ('GRID', (0, 0), (-1, -1), 0.5, c['BORDER_COLOR']),
        ('TOPPADDING', (0, 0), (-1, -1), 4.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.append(eng_input_table)
    story.append(Spacer(1, 8))

    # 2. Dua Keputusan TR: Approve vs Reject
    story.append(Paragraph("2. Cabang Keputusan Tenant Relation (TR Decision)", st['h1']))
    
    decision_matrix_data = [
        [
            Paragraph("KEPUTUSAN TR", st['body_white']),
            Paragraph("AKSI & SKEMA BIAYA", st['body_white']),
            Paragraph("STATUS PERMIT & DAMPAK SISTEM", st['body_white'])
        ],
        [
            Paragraph("<b>A. APPROVE<br/>(GRATIS)</b>", st['body_bold']),
            Paragraph("TR menyetujui pengajuan Engineering sebagai <b>Free of Charge</b> (toleransi teknis).", st['body']),
            Paragraph("• Biaya: <b>Rp 0,00</b><br/>• Tanggal Berakhir: <b>13 Aug 2026</b><br/>• Status: Tetap <b>ON WORK</b> tanpa tagihan.", st['body'])
        ],
        [
            Paragraph("<b>B. APPROVE<br/>(BERBAYAR)</b>", st['body_bold']),
            Paragraph("TR menyetujui pengajuan namun mengenakan biaya supervisi harian (<b>Chargeable</b>).", st['body']),
            Paragraph("• Biaya: Terbit <b>Extension Bill</b>.<br/>• Status: <b>WAITING PAYMENT</b>.<br/>• Lunas ➔ status kembali ke <b>ON WORK</b>.", st['body'])
        ],
        [
            Paragraph("<b>C. REJECT<br/>(DITOLAK)</b>", ParagraphStyle('RejTxt', fontName='Helvetica-Bold', fontSize=8.5, textColor=c['RED_ACCENT'])),
            Paragraph("TR menolak perpanjangan, mengisi alasan penolakan, dan klik <b>Confirm Rejection</b>.", st['body']),
            Paragraph("• Status: <b>ON WORK</b> (hanya s/d tgl 10 Aug sore).<br/>• Pekerja bersiap mengosongkan unit.<br/>• Akses diblokir Security besoknya.", st['body'])
        ]
    ]
    decision_matrix_table = Table(decision_matrix_data, colWidths=[100, 210, 210])
    decision_matrix_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, 0), c['DARK']),
        ('BACKGROUND', (0, 1), (-1, 1), c['GREEN_LIGHT']),
        ('BACKGROUND', (0, 2), (-1, 2), c['BLUE_LIGHT']),
        ('BACKGROUND', (0, 3), (-1, 3), c['RED_LIGHT']),
        ('GRID', (0, 0), (-1, -1), 0.5, c['BORDER_COLOR']),
        ('TOPPADDING', (0, 0), (-1, -1), 4.5),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 4.5),
        ('LEFTPADDING', (0, 0), (-1, -1), 7),
        ('RIGHTPADDING', (0, 0), (-1, -1), 7),
    ]))
    story.append(decision_matrix_table)
    story.append(Spacer(1, 8))

    # 3. Aturan Auto-Complete ke Final Inspection
    story.append(Paragraph("3. Aturan Otomatis: Auto-Complete ke Final Inspection Pasca-Rejection", st['h1']))
    
    auto_rule_data = [
        [
            Paragraph(
                "<b>Logika Operasional Apartemen & Sistem Pencegahan Status Menggantung (No Deadlock Policy):</b><br/>"
                "1. <b>Batas Waktu Izin Kerja:</b> Setelah jam kerja tanggal 10 Agustus berakhir, ID Card kontraktor otomatis tidak berlaku dan akses fisik unit diblokir oleh Security gedung.<br/>"
                "2. <b>Jika Tanpa Kesepakatan Baru:</b> Jika permohonan ditolak dan tidak ada penerbitan perpanjangan baru oleh TR sampai batas jam kerja izin berakhir, maka <b>pekerjaan di unit secara otomatis dianggap selesai (concluded)</b>.<br/>"
                "3. <b>Otomatisasi Sistem:</b> Sistem <b>secara otomatis memajukan tiket fitout ke tahap Step 6: FINAL INSPECTION</b> agar tim pengelola gedung dapat segera melakukan pengecekan BAST, verifikasi defek/cacat, dan penutupan pengembalian uang deposit tenant tanpa menggantung siklus hidup permit.",
                st['body']
            )
        ]
    ]
    auto_rule_table = Table(auto_rule_data, colWidths=[520])
    auto_rule_table.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c['LIGHT_BG']),
        ('BOX', (0, 0), (-1, -1), 1, c['RED_ACCENT']),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(auto_rule_table)
    story.append(Spacer(1, 8))

    # 4. Sign-off Box
    sign_data_2 = [
        [
            Paragraph(
                "<b>Ringkasan untuk Project Manager:</b><br/>"
                "Skenario 2 memastikan koordinasi transparan antara Engineering lapangan dan Tenant Relation. Pemisahan wewenang ditegakkan di mana Engineering hanya mengajukan aspek teknis, sedangkan penentuan biaya dan persetujuan berada di tangan TR. Aturan <i>Auto-Final Inspection</i> menjamin tiket permit selalu memiliki ujung penyelesaian yang teratur.",
                st['callout']
            )
        ]
    ]
    sign_table_2 = Table(sign_data_2, colWidths=[520])
    sign_table_2.setStyle(TableStyle([
        ('BACKGROUND', (0, 0), (-1, -1), c['PRIMARY_LIGHT']),
        ('BOX', (0, 0), (-1, -1), 1, c['PRIMARY']),
        ('TOPPADDING', (0, 0), (-1, -1), 6),
        ('BOTTOMPADDING', (0, 0), (-1, -1), 6),
        ('LEFTPADDING', (0, 0), (-1, -1), 10),
        ('RIGHTPADDING', (0, 0), (-1, -1), 10),
    ]))
    story.append(sign_table_2)

    doc.build(story)
    print(f"PDF Scenario 2 successfully generated at: {output_path}")

if __name__ == '__main__':
    project_root = "/Users/rmm/Documents/Vibe Coding Proapps/FITOUT WEB"
    public_dir = os.path.join(project_root, "public")
    os.makedirs(public_dir, exist_ok=True)

    # PDF 1
    pdf_1_name = "Fitout_Skenario_1_TR_Direct_Extension.pdf"
    create_pdf_scenario_1_tr_direct(os.path.join(project_root, pdf_1_name))
    create_pdf_scenario_1_tr_direct(os.path.join(public_dir, pdf_1_name))

    # PDF 2
    pdf_2_name = "Fitout_Skenario_2_Engineering_Request_Lifecycle.pdf"
    create_pdf_scenario_2_eng_lifecycle(os.path.join(project_root, pdf_2_name))
    create_pdf_scenario_2_eng_lifecycle(os.path.join(public_dir, pdf_2_name))
