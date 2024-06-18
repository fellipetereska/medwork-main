import React, { useEffect, useState } from 'react';
import { Document, Page, Text, View, StyleSheet, PDFViewer, PDFDownloadLink } from '@react-pdf/renderer';

function PdfGenerate({
  inventario, plano,
  company, unidades, setores, cargos, contatos,
  processos, riscos, medidasAdm, medidasEpi, medidasEpc,
  user, aparelhos, data, versao, pdfVersion,
}) {

  const findSetor = (item) => {
    const findSetor = setores.find((i) => i.id_setor === item);
    return findSetor ? findSetor.nome_setor : "N/A";
  };

  const getTotalFuncMasc = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
  };

  const getTotalFuncFem = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
  };

  const getTotalFuncMenor = () => {
    return cargos.reduce((total, cargo) => total + cargo.func_menor, 0);
  };

  const getTotalFunc = () => {
    const funcMasc = cargos.reduce((total, cargo) => total + cargo.func_masc, 0);
    const funcFem = cargos.reduce((total, cargo) => total + cargo.func_fem, 0);
    const funcMenor = cargos.reduce((total, cargo) => total + cargo.func_menor, 0);

    return funcMasc + funcFem + funcMenor;
  };

  const find = (item, tipo) => {
    try {
      if (!item) {
        return 'N/A';
      }

      switch (tipo) {
        case 'nome_unidade':
          const unidadeEncontrada = unidades.find((c) => c.id_unidade === item);
          return unidadeEncontrada ? unidadeEncontrada.nome_unidade : 'N/A';

        case 'nome_setor':
          const setorEncontrado = setores.find((c) => c.id_setor === item);
          return setorEncontrado ? setorEncontrado.nome_setor : 'N/A';

        case 'nome_processo':
          const processoEncontrado = processos.find((c) => c.id_processo === item);
          return processoEncontrado ? processoEncontrado.nome_processo : 'N/A';

        case 'nome_aparelho':
          const aparelhosEncontrado = aparelhos.find((c) => c.id_aparelho === item);
          const aparelho = `${aparelhosEncontrado.nome_aparelho} - ${aparelhosEncontrado.marca_aparelho} (${formatData(aparelhosEncontrado.data_calibracao_aparelho)})`
          return aparelho;

        case 'nome_risco':
        case 'grupo_risco':
        case 'consequencia':
        case 'avaliacao':
        case 'limite_tolerancia':
        case 'metodologia':
        case 'severidade':
        case 'unidade_medida':
          const riscoEncontrado = riscos.find((c) => c.id_risco === item);
          if (riscoEncontrado) {
            switch (tipo) {
              case 'nome_risco':
                return riscoEncontrado.nome_risco || "N/A";
              case 'grupo_risco':
                return riscoEncontrado.grupo_risco || "N/A";
              case 'consequencia':
                return riscoEncontrado.danos_saude_risco || "N/A";
              case 'avaliacao':
                return riscoEncontrado.classificacao_risco || "N/A";
              case 'limite_tolerancia':
                return riscoEncontrado.limite_tolerancia_risco || "0";
              case 'metodologia':
                return riscoEncontrado.metodologia_risco || "N/A";
              case 'severidade':
                return riscoEncontrado.severidade_risco || "N/A";
              case 'unidade_medida':
                return riscoEncontrado.unidade_medida_risco;
            }
          } else {
            return 'N/A';
          }
        default:
          return 'N/A';
      }
    } catch (error) {
      console.log("Erro ao buscar Dados!", error);
      return 'N/A';
    }
  };

  const formatData = (item) => {
    try {
      const data_formatada = new Date(item).toLocaleDateString('pr-BR');
      return data_formatada || 'N/A';
    } catch (error) {
      console.log("Erro ao formatar data!", error);
    }
  };

  const convertMedidas = (item) => {
    try {
      const medidasArray = JSON.parse(item);
      return medidasArray.map(({ nome, tipo }) => `${tipo}: ${nome}`).join('\n');
    } catch (error) {
      console.error("Erro ao converter medidas:", error);
      return 'N/A';
    }
  };

  const convertProbSev = (item) => {
    try {
      switch (item) {
        case 1:
          return "Muito Baixa";
        case 2:
          return "Baixa";
        case 3:
          return "Média";
        case 4:
          return "Alta";
        case 5:
          return "Muito Alta";
        default:
          return "N/A";
      }
    } catch (error) {
      console.log("Erro ao converter Probabilidade/Severidade!", error);
    }
  };

  const convertNivel = (item) => {
    try {
      if (item >= 1 && item <= 6) {
        return "Baixo";
      } else if (item >= 8 && item <= 12) {
        return "Moderado"
      } else if (item >= 15 && item <= 16) {
        return "Alto"
      } else if (item >= 19) {
        return "Crítico"
      } else {
        return "N/A"
      }
    } catch (error) {
      console.log("Erro ao converter Nível!", error);
    }
  };

  const findMedidas = (medida, tipo) => {
    try {
      switch (tipo) {
        case 1:
          const filterMedidaAdm = medidasAdm.find((i) => i.id_medida_adm === medida);
          return filterMedidaAdm.descricao_medida_adm;
        case 2:
          const filterMedidaEpi = medidasEpi.find((i) => i.id_medida === medida);
          const medidaEpi = `${filterMedidaEpi.nome_medida} - ${filterMedidaEpi.certificado_medida} (${filterMedidaEpi.vencimento_certificado_medida})`
          return medidaEpi;
        case 3:
          const filterMedidaEpc = medidasEpc.find((i) => i.id_medida === medida);
          return filterMedidaEpc.descricao_medida;
        default:
          break;
      }
    } catch (error) {
      console.error("Erro ao buscar medida!", error)
    }
  };

  const findTipo = (tipo) => {
    try {
      switch (tipo) {
        case 1:
          return "Adm"
        case 2:
          return "Epi"
        case 3:
          return "Epc"
        default:
          break;
      }
    } catch (error) {
      console.error("Erro ao filtrar tipo de medida", error)
    }
  };

  const getColor = (item) => {
    try {
      switch (item) {
        case 1:
          return '#d8f3dc'
        case 2:
          return '#caf0f8'
        case 3:
          return '#fff6cc'
        case 4:
          return '#ffc971'
        case 5:
          return '#fcb9b2'
        case 0:
          return '#e9ecef'
        default:
          return '#e9ecef'
      }
    } catch (error) {
      console.log("Erro ao modificar cor de fundo!", error)
    }
  };

  const getColorStatus = (item) => {
    try {
      switch (item) {
        case 'Não Realizado':
          return '#ffc971'
        default:
          return '#e9ecef'
      }
    } catch (error) {
      console.log("Erro ao modificar cor de fundo!", error)
    }
  };

  const getColorNivel = (item) => {
    try {
      if (item >= 1 && item <= 6) {
        return "#d8f3dc";
      } else if (item >= 8 && item <= 12) {
        return "#fff6cc"
      } else if (item >= 15 && item <= 16) {
        return "#ffc971"
      } else if (item >= 19) {
        return "#fcb9b2"
      } else {
        return "#e9ecef"
      }
    } catch (error) {
      console.log("Erro ao converter Nível!", error);
    }
  };

  const setVigencia = (item) => {
    try {
      const dataCalculada = new Date(item);

      dataCalculada.setFullYear(dataCalculada.getFullYear() + 2);
      return formatData(dataCalculada);
    } catch (error) {
      console.log("Erro ao calcular data", error)
    }
  };



  

  const PageStyles = StyleSheet.create({
    pageCenter: {
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    Page: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 40,
      paddingVertical: 10,
      height: '100%',
    },

    LandscapePage: {
      flexDirection: 'column',
      backgroundColor: '#FFFFFF',
      paddingHorizontal: 10,
      paddingVertical: 10,
      height: '100%',
    },
  });

  const TextStyles = StyleSheet.create({
    headerText: {
      fontSize: 14,
      textAlign: 'center',
      marginBottom: 5,
      paddingTop: 10,
    },

    topText: {
      fontSize: 16,
      textAlign: 'center',
      marginBottom: 20,
    },

    centerText: {
      fontSize: 24,
      textAlign: 'center',
      marginBottom: 20,
      fontWeight: 'bold',
    },

    SignatureDate: {
      fontSize: 10,
      textAlign: 'left',
      color: '#343a40',
    },

    officeText: {
      fontSize: 12,
    },

    officeSmallText: {
      fontSize: 10,
      color: '#6c757d',
    },

    smallText: {
      fontSize: 12,
    },

    littleText: {
      fontSize: 10,
      textAlign: 'center',
    },

    smallTextVigencia: {
      fontSize: 10,
    },

    subTitleSumary: {
      fontSize: 16,
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
    },

    prefixText: {
      fontSize: 8,
      color: '#6c757d',
      marginRight: 5,
    },

    prefixTextTitle: {
      fontSize: 8,
      color: '#ced4da',
      marginRight: 5,
    },

    valueText: {
      fontSize: 12,
      color: '#495057',
    },

    valueTextTitle: {
      fontSize: 14,
      color: '#f8f9fa',
    },

    valueTextSignatureTitle: {
      fontSize: 12,
      color: '#f8f9fa',
    },

    footerText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 5,
    },

    footerAddresText: {
      fontSize: 10,
      textAlign: 'center',
      marginTop: 2,
      color: '#adb5bd',
    },
  });

  const ContainerStyles = StyleSheet.create({
    headerContainer: {
      width: '100%',
      borderBottom: '1 solid #e5e5e5',
      marginBottom: 20,
    },

    centerContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
    },

    bottomContainer: {
      marginTop: 'auto',
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    bottomContainerVigencia: {
      marginTop: 'auto',
      width: '100%',
      marginBottom: 10,
      flexDirection: 'row',
      justifyContent: 'flex-end',
    },

    signatureContainer: {
      width: '100%',
      marginTop: 50,
    },

    footerContainer: {
      marginTop: 'auto',
      width: '100%',
      borderTop: '1 solid #e5e5e5',
    },

  });

  const TableStyles = StyleSheet.create({
    table: {
      marginTop: 10,
      width: '100%',
    },

    headerCell: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
    },

    headerTable: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      backgroundColor: '#0077b6',
      width: '100%',
      flexDirection: 'row',
    },

    headerCellTable: {
      width: '33%',
      justifyContent: 'center',
      alignItems: 'center',
    },

    tableRow: {
      borderBottom: '1 solid #343a40',
      flexDirection: 'row',
      width: '100%',
      alignItems: 'center',
    },

    seventyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '75%',
    },

    fiftyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '50%',
    },

    fortyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '40%',
    },

    twentyFiveRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '25%',
    },

    twentyRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '20%',
    },

    fifTeenRow: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      width: '15%',
    },

  });

  const HeaderPage = () => {
    return (
      <View style={ContainerStyles.headerContainer}>
        <Text style={TextStyles.headerText}>PGR - Programa de Gerenciamento de Riscos - NR1</Text>
        <Text style={TextStyles.littleText}>{company.nome_empresa} - Versão: {versao ? versao : '1'}</Text>
      </View>
    );
  }

  const FooterPage = () => {
    return (
      <View style={ContainerStyles.footerContainer}>
        <Text style={TextStyles.footerText}>{company.nome_empresa}</Text>
        <Text style={TextStyles.footerAddresText}>Rua Goias, 1914 - apto 301 - Londrina/PR 86020-410</Text>
      </View>
    );
  }

  const CoverPage = () => {
    return (
      <Page size="A4" style={PageStyles.pageCenter}>
        <Text style={TextStyles.headerText}>Programa de Gerenciamento de Riscos - PGR</Text>
        <View style={ContainerStyles.centerContainer}>
          <Text style={TextStyles.centerText}>{company.nome_empresa}</Text>
        </View>
        <View style={ContainerStyles.bottomContainerVigencia}>
          <Text style={TextStyles.smallTextVigencia}>Londrina, {formatData(data)} - Vigência: {setVigencia(data)}</Text>
        </View>
      </Page>
    )
  };

  const SumaryPage = () => {
    return (
      <Page size="A4" style={PageStyles.pageCenter}>
        <HeaderPage />
        <Text style={TextStyles.topText}>Sumário</Text>
        <FooterPage />
      </Page>
    );
  };

  const VersionTable = () => {

    const RiskInventoryStyles = StyleSheet.create({
      headerRow: {
        gap: 2,
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        flexDirection: 'row',
        color: '#f8f9fa',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        justifyContent: 'center',
      },

      headerCellCenter: {
        textAlign: 'center',
        fontSize: 10,
        width: '15%',
      },

      headerCell: {
        textAlign: 'center',
        fontSize: 10,
        width: '45%',
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 10,
        width: '45%',
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        textAlign: 'center',
        flexDirection: 'row',
        fontSize: 10,
        alignItems: 'center',
        width: '15%',
      },

    });

    return (
      <Page style={PageStyles.Page}>
        <Text style={TextStyles.subTitleSumary}>0. Versões do PGR</Text>

        {/* Versões */}
        <View style={TableStyles.table}>
          <View style={RiskInventoryStyles.headerRow}>
            <Text style={RiskInventoryStyles.headerCellCenter}>ID</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Versão</Text>
            <Text style={RiskInventoryStyles.headerCell}>Empresa</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Data</Text>
          </View>
          {pdfVersion.map((item, i) => (
            <View key={i} style={RiskInventoryStyles.dataRow}>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.id_versao || ''}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.versao}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{company.nome_empresa}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{formatData(item.data)}</Text>
            </View>
          ))}
        </View>
      </Page>
    );
  };

  const CompanyPage = () => {

    const CompanyStyles = StyleSheet.create({
      officeFiftyRow: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        width: '50%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerSignatureContentCell: {
        paddingHorizontal: 10,
        paddingVertical: 10,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
      },

      headerSignatureCell: {
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      signatureLine: {
        height: '20%',
        borderBottom: '1 solida #343a40'
      },

    });

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>1. Identificação da Empresa</Text>

        {/* Company Table */}
        <View style={TableStyles.table}>
          <View style={TableStyles.headerCell}>
            <Text style={TextStyles.prefixTextTitle}>Empresa: </Text>
            <Text style={TextStyles.valueTextTitle}>{company.nome_empresa || "N/A"}</Text>
          </View>
          <View style={TableStyles.tableRow}>
            <View style={TableStyles.twentyFiveRow}>
              <Text style={TextStyles.prefixText}>CNPJ:</Text>
              <Text style={TextStyles.valueText}>{company.cnpj_empresa || "N/A"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Cnae:</Text>
              <Text style={TextStyles.valueText}>{company.cnae_empresa || "0"}</Text>
            </View>
            <View style={TableStyles.fifTeenRow}>
              <Text style={TextStyles.prefixText}>Grau de Risco:</Text>
              <Text style={TextStyles.valueText}>{company.grau_risco_cnae || "0"}</Text>
            </View>
            <View style={TableStyles.fiftyRow}>
              <Text style={TextStyles.prefixText}>Descrição CNAE:</Text>
              <Text style={TextStyles.valueText}>Serviços de manutenção e reparação mecânica de veículos automotores</Text>
            </View>
          </View>
        </View>

        {/* Signature Table */}
        <View style={ContainerStyles.signatureContainer}>
          <Text style={TextStyles.SignatureDate}>Londrina, {formatData(data)}</Text>

          {/* Assinatura do Técnico */}
          <View style={TableStyles.table}>
            <View style={CompanyStyles.headerSignatureContentCell}>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Elaborador</Text>
              </View>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={CompanyStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{user.nome_usuario}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={CompanyStyles.signatureLine}></View>
              </View>
            </View>
          </View>

          {/* Signature Table */}
          <View style={TableStyles.table}>
            <View style={CompanyStyles.headerSignatureContentCell}>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Responsável</Text>
              </View>
              <View style={CompanyStyles.headerSignatureCell}>
                <Text style={TextStyles.valueTextSignatureTitle}>Assinatura</Text>
              </View>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={CompanyStyles.officeFiftyRow}>
                <Text style={TextStyles.officeText}>{contatos.nome_contato}</Text>
                <Text style={TextStyles.officeSmallText}>{contatos.email_contato}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <View style={CompanyStyles.signatureLine}></View>
              </View>
            </View>
          </View>

        </View>

        {/* Footer */}
        <FooterPage />

      </Page>
    );
  };

  const UnidadesPage = () => {
    return (
      <Page style={PageStyles.Page}>

        <HeaderPage />

        <Text style={TextStyles.subTitleSumary}>2. Unidades da empresa</Text>

        {/* Unidades */}
        {unidades.map((item, i) => (
          <View key={i} style={TableStyles.table}>
            <View style={TableStyles.headerCell}>
              <Text style={TextStyles.prefixTextTitle}>Unidade: </Text>
              <Text style={TextStyles.valueTextTitle}>{item.nome_unidade}</Text>
            </View>
            <View style={TableStyles.tableRow}>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>CNPJ:</Text>
                <Text style={TextStyles.valueText}>{item.cnpj_unidade || "N/A"}</Text>
              </View>
              <View style={TableStyles.twentyFiveRow}>
                <Text style={TextStyles.prefixText}>Cep:</Text>
                <Text style={TextStyles.valueText}>{item.cep_unidade}</Text>
              </View>
              <View style={TableStyles.fiftyRow}>
                <Text style={TextStyles.prefixText}>Endereço:</Text>
                <Text style={TextStyles.valueText}>{item.endereco_unidade}, {item.numero_unidade} - {item.complemento}</Text>
                <Text style={TextStyles.valueText}>{item.bairro_unidade} - {item.cidade_unidade}/{item.uf_unidade}</Text>
              </View>
            </View>
          </View>
        ))}

        <FooterPage />
      </Page>
    );
  }

  const PostPage = () => {

    const PostStyles = StyleSheet.create({
      postRow: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
      },

      postRowDesc: {
        padding: 10,
        width: '40%',
        flexDirection: 'row',
      },

      postRowFunc: {
        padding: 10,
        width: '20%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerPostContentCell: {
        paddingHorizontal: 10,
        paddingVertical: 5,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
      },

      headerPostCell: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerPostCellFunc: {
        width: '20%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      headerPostCellDesc: {
        width: '40%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      postText: {
        fontSize: 8,
      },

      tableRow: {
        paddingHorizontal: 5,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      row: {
        flexDirection: 'row',
        paddingHorizontal: 10,
        paddingVertical: 5,
        width: '25%',
        justifyContent: 'center',
        alignItems: 'center',
      },

      coluun: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '25%',
      },

      containerFunc: {
        marginTop: 30,
      },

      subTitleSumary: {
        fontSize: 14,
        justifyContent: 'flex-start',
        alignItems: 'flex-start',
      },

    });

    return (
      <Page style={PageStyles.Page}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>16. Caracterização das Atividades e Cargos</Text>

        {/* Tabela de Setores e Cargos */}
        <View style={TableStyles.table}>
          <View style={PostStyles.headerPostContentCell}>
            <View style={PostStyles.headerPostCell}>
              <Text style={TextStyles.valueTextSignatureTitle}>Setor</Text>
            </View>
            <View style={PostStyles.headerPostCell}>
              <Text style={TextStyles.valueTextSignatureTitle}>Cargo</Text>
            </View>
            <View style={PostStyles.headerPostCellDesc}>
              <Text style={TextStyles.valueTextSignatureTitle}>Descrição detalhada do cargo</Text>
            </View>
            <View style={PostStyles.headerPostCellFunc}>
              <Text style={TextStyles.valueTextSignatureTitle}>Nº Funcionários</Text>
            </View>
          </View>
          {cargos.map((item, i) => (
            <View key={i} style={PostStyles.tableRow}>
              <View style={PostStyles.postRow}>
                <Text style={PostStyles.postText}>{findSetor(item.fk_setor_id)}</Text>
              </View>
              <View style={PostStyles.postRow}>
                <Text style={PostStyles.postText}>{item.nome_cargo}</Text>
              </View>
              <View style={PostStyles.postRowDesc}>
                <Text style={PostStyles.postText}>{item.descricao}</Text>
              </View>
              <View style={PostStyles.postRowFunc}>
                <Text style={PostStyles.postText}>Masc: {item.func_masc}</Text>
                <Text style={PostStyles.postText}>Fem: {item.func_fem}</Text>
                <Text style={PostStyles.postText}>Menor: {item.func_menor}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Tabela Funcionários Total */}
        <View style={PostStyles.containerFunc}>

          {/* Título */}
          <Text style={PostStyles.subTitleSumary}>Total de Funcionários</Text>

          {/* Tabela */}
          <View style={TableStyles.table}>
            <View style={PostStyles.headerPostContentCell}>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Masculino</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Feminino</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Menor</Text>
              </View>
              <View style={PostStyles.coluun}>
                <Text style={TextStyles.valueTextSignatureTitle}>Total</Text>
              </View>
            </View>
            <View style={PostStyles.tableRow}>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFuncMasc()}</Text>
              </View>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFuncFem()}</Text>
              </View>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFuncMenor()}</Text>
              </View>
              <View style={PostStyles.row}>
                <Text style={PostStyles.postText}>{getTotalFunc()}</Text>
              </View>
            </View>
          </View>
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const RiskInventoryPage = () => {

    const RiskInventoryStyles = StyleSheet.create({
      headerRow: {
        gap: 2,
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
        color: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
      },

      headerCellCenter: {
        width: '10%',
        textAlign: 'center',
        fontSize: 6,
      },

      headerCell: {
        width: '10%',
        textAlign: 'left',
        fontSize: 6,
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 6,
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize: 6,
        alignItems: 'center',
      },

      dataCellColor: {
        width: '10%',
        textAlign: 'center',
        fontSize: 6,
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
      },

    });

    return (
      <Page size="A4" orientation='landscape' style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>17. Inventário de Riscos</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={RiskInventoryStyles.headerRow}>
            <Text style={RiskInventoryStyles.headerCellCenter}>ID</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Data</Text>
            <Text style={RiskInventoryStyles.headerCell}>Unidade</Text>
            <Text style={RiskInventoryStyles.headerCell}>Setor</Text>
            <Text style={RiskInventoryStyles.headerCell}>Processo</Text>
            <Text style={RiskInventoryStyles.headerCell}>Risco</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Tipo</Text>
            <Text style={RiskInventoryStyles.headerCell}>Consequência</Text>
            <Text style={RiskInventoryStyles.headerCell}>Fontes</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Pessoas Expostas</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Avaliação</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Frequência</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Medição</Text>
            <Text style={RiskInventoryStyles.headerCell}>Aparelho</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Limite de Tolerância</Text>
            <Text style={RiskInventoryStyles.headerCell}>Metodologia</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Medidas</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Probabilidade</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Severidade</Text>
            <Text style={RiskInventoryStyles.headerCellCenter}>Nível</Text>
            <Text style={RiskInventoryStyles.headerCell}>Comentários</Text>
          </View>
          {/* Body */}
          {inventario.map((item, i) => (
            <View key={i} style={RiskInventoryStyles.dataRow}>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.id_inventario || ''}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{formatData(item.data_inventario) || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_unidade_id, 'nome_unidade')}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_setor_id, 'nome_setor')}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_processo_id, 'nome_processo')}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_risco_id, 'nome_risco') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{find(item.fk_risco_id, 'grupo_risco') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_risco_id, 'consequencia') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{item.fontes || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.pessoas_expostas || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{find(item.fk_risco_id, 'avaliacao') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.frequencia || '0'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{item.medicao + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_aparelho_id, 'nome_aparelho') || 'N/A'}</Text>
              <Text style={RiskInventoryStyles.dataCellCenter}>{find(item.fk_risco_id, 'limite_tolerancia') + " " + find(item.fk_risco_id, 'unidade_medida') || '0'}</Text>
              <Text style={RiskInventoryStyles.dataCell}>{find(item.fk_risco_id, 'metodologia') || 'N/A'}</Text>
              <View style={RiskInventoryStyles.dataCell}>
                <Text>{convertMedidas(item.medidas) || 'N/A'}</Text>
              </View>
              <View style={{ ...RiskInventoryStyles.dataCellColor, backgroundColor: getColor(item.probabilidade) }}>
                <Text>{convertProbSev(item.probabilidade) || 'N/A'}</Text>
              </View>
              <View style={{ ...RiskInventoryStyles.dataCellColor, backgroundColor: getColor(find(item.fk_risco_id, 'severidade')) }}>
                <Text>{convertProbSev(find(item.fk_risco_id, 'severidade')) || 'N/A'}</Text>
              </View>
              <View style={{ ...RiskInventoryStyles.dataCellColor, backgroundColor: getColorNivel(item.nivel) }}>
                <Text>{convertNivel(item.nivel) || 'N/A'}</Text>
              </View>
              <Text style={RiskInventoryStyles.dataCell}>{item.comentarios || ''}</Text>
            </View>
          ))}
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const PlanPage = () => {

    const PlanStyles = StyleSheet.create({
      headerRow: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        backgroundColor: '#0077b6',
        width: '100%',
        flexDirection: 'row',
        color: '#f8f9fa',
        justifyContent: 'center',
        alignItems: 'center',
      },

      dataRow: {
        paddingHorizontal: 3,
        borderBottom: '1 solid #343a40',
        flexDirection: 'row',
        width: '100%',
        alignItems: 'center',
      },

      headerCellCenter: {
        width: '10%',
        textAlign: 'center',
        fontSize: 8,
      },

      headerCell: {
        width: '10%',
        textAlign: 'left',
        fontSize: 8,
      },

      dataCell: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'left',
        flexDirection: 'row',
        fontSize: 8,
      },

      dataCellCenter: {
        paddingHorizontal: 3,
        paddingVertical: 3,
        width: '10%',
        textAlign: 'center',
        flexDirection: 'row',
        fontSize: 8,
      },

      dataCellColor: {
        width: '10%',
        textAlign: 'center',
        fontSize: 8,
        height: '100%',
        justifyContent: 'center',
      },

    });

    return (
      <Page size="A4" orientation='landscape' style={PageStyles.LandscapePage}>

        {/* Cabeçalho */}
        <HeaderPage />

        {/* Sumário */}
        <Text style={TextStyles.subTitleSumary}>18. Plano de Ação</Text>

        {/* Tabela do Inventário */}
        <View style={TableStyles.table}>
          {/* Header */}
          <View style={PlanStyles.headerRow}>
            <Text style={PlanStyles.headerCellCenter}>ID</Text>
            <Text style={PlanStyles.headerCellCenter}>Data</Text>
            <Text style={PlanStyles.headerCell}>Unidade</Text>
            <Text style={PlanStyles.headerCell}>Setor</Text>
            <Text style={PlanStyles.headerCell}>Responsável</Text>
            <Text style={PlanStyles.headerCell}>Processo</Text>
            <Text style={PlanStyles.headerCell}>Risco</Text>
            <Text style={PlanStyles.headerCellCenter}>Tipo</Text>
            <Text style={PlanStyles.headerCell}>Medida</Text>
            <Text style={PlanStyles.headerCellCenter}>Prazo</Text>
            <Text style={PlanStyles.headerCellCenter}>Data de Conclusão</Text>
            <Text style={PlanStyles.headerCellCenter}>Status</Text>
          </View>
          {/* Body */}
          {plano.map((item, i) => (
            <View key={i} style={PlanStyles.dataRow}>
              <Text style={PlanStyles.dataCellCenter}>{item.id_plano}</Text>
              <Text style={PlanStyles.dataCellCenter}>{formatData(item.data) || ""}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_unidade_id, 'nome_unidade')}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_setor_id, 'nome_setor')}</Text>
              <Text style={PlanStyles.dataCell}>{item.responsavel || 'N/A'}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_processo_id, 'nome_processo')}</Text>
              <Text style={PlanStyles.dataCell}>{find(item.fk_risco_id, 'nome_risco') || 'N/A'}</Text>
              <Text style={PlanStyles.dataCellCenter}>{findTipo(item.tipo_medida) || 'N/A'}</Text>
              <Text style={PlanStyles.dataCell}>{findMedidas(item.fk_medida_id, item.tipo_medida) || 'N/A'}</Text>
              <Text style={PlanStyles.dataCellCenter}>{item.prazo}</Text>
              <Text style={PlanStyles.dataCellCenter}></Text>
              <View style={{ ...PlanStyles.dataCellColor, backgroundColor: getColorStatus(item.status) }}>
                <Text>{item.status || 'N/A'}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Footer */}
        <FooterPage />
      </Page>
    );
  };

  const MyDocument = () => {
    return (
      <Document>
        <CoverPage />
        <SumaryPage />
        <VersionTable />
        <CompanyPage />
        <UnidadesPage />
        <PostPage />
        <RiskInventoryPage />
        <PlanPage />
      </Document>
    );
  };

  return MyDocument();
}

export default PdfGenerate;
